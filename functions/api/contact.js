import { Resend } from 'resend';

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  whatsapp: 30,
  company: 100,
  message: 2000,
};

const GENERIC_VALIDATION_ERROR = {
  success: false,
  message: 'Verifique os dados enviados.',
};

const GENERIC_INTERNAL_ERROR = {
  success: false,
  message: 'Não foi possível enviar sua mensagem.',
};

function buildJsonResponse(success, message, status = 200) {
  return new Response(
    JSON.stringify({
      success,
      message,
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    },
  );
}

function sanitizeString(value, maxLength) {
  if (typeof value !== 'string') {
    return '';
  }

  const cleaned = value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!maxLength) {
    return cleaned;
  }

  return cleaned.slice(0, maxLength).trim();
}

export function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };

    return map[character] || character;
  });
}

export function validateContactPayload(payload = {}) {
  const normalized = {
    name: sanitizeString(payload.name, MAX_LENGTHS.name),
    email: sanitizeString(payload.email, MAX_LENGTHS.email).toLowerCase(),
    whatsapp: sanitizeString(payload.whatsapp, MAX_LENGTHS.whatsapp),
    company: sanitizeString(payload.company, MAX_LENGTHS.company),
    message: sanitizeString(payload.message, MAX_LENGTHS.message),
    website: sanitizeString(payload.website, 200),
  };

  if (normalized.website) {
    return {
      ok: false,
      message: GENERIC_VALIDATION_ERROR.message,
      status: 400,
    };
  }

  if (!normalized.name || normalized.name.length < 2) {
    return {
      ok: false,
      message: GENERIC_VALIDATION_ERROR.message,
      status: 400,
    };
  }

  if (!normalized.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
    return {
      ok: false,
      message: GENERIC_VALIDATION_ERROR.message,
      status: 400,
    };
  }

  if (normalized.whatsapp && normalized.whatsapp.length < 8) {
    return {
      ok: false,
      message: GENERIC_VALIDATION_ERROR.message,
      status: 400,
    };
  }

  if (normalized.company && normalized.company.length < 2) {
    return {
      ok: false,
      message: GENERIC_VALIDATION_ERROR.message,
      status: 400,
    };
  }

  if (!normalized.message || normalized.message.length < 20) {
    return {
      ok: false,
      message: GENERIC_VALIDATION_ERROR.message,
      status: 400,
    };
  }

  return {
    ok: true,
    data: normalized,
  };
}

function buildContactHtml(data) {
  return `
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <title>Novo contato - StackByte</title>
      </head>
      <body style="margin:0;padding:32px;font-family:Arial,sans-serif;background:#f7f7f7;color:#101828;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:32px;">
          <h2 style="margin:0 0 16px;font-size:24px;color:#111827;">Novo contato recebido</h2>
          <p style="margin:0 0 20px;line-height:1.6;color:#374151;">Você recebeu uma nova mensagem do formulário de contato da StackByte.</p>

          <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;font-weight:bold;width:120px;color:#111827;">Nome</td>
              <td style="padding:8px 0;color:#374151;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:bold;color:#111827;">E-mail</td>
              <td style="padding:8px 0;color:#374151;">${escapeHtml(data.email)}</td>
            </tr>
            ${data.whatsapp ? `
              <tr>
                <td style="padding:8px 0;font-weight:bold;color:#111827;">WhatsApp</td>
                <td style="padding:8px 0;color:#374151;">${escapeHtml(data.whatsapp)}</td>
              </tr>
            ` : ''}
            ${data.company ? `
              <tr>
                <td style="padding:8px 0;font-weight:bold;color:#111827;">Empresa</td>
                <td style="padding:8px 0;color:#374151;">${escapeHtml(data.company)}</td>
              </tr>
            ` : ''}
          </table>

          <div style="margin-top:24px;padding:20px;border-radius:10px;background:#f9fafb;border:1px solid #e5e7eb;">
            <div style="margin:0 0 8px;font-weight:bold;color:#111827;">Mensagem</div>
            <p style="margin:0;line-height:1.7;color:#374151;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function buildPlainTextEmail(data) {
  const lines = [
    'Novo contato recebido - StackByte',
    '',
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
  ];

  if (data.whatsapp) {
    lines.push(`WhatsApp: ${data.whatsapp}`);
  }

  if (data.company) {
    lines.push(`Empresa: ${data.company}`);
  }

  lines.push('', 'Mensagem:');
  lines.push(data.message);

  return lines.join('\n');
}

async function verifyTurnstile(secretKey, token) {
  if (!secretKey) {
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });

    if (!verifyResponse.ok) {
      return false;
    }

    const verification = await verifyResponse.json();
    return Boolean(verification.success);
  } catch {
    return false;
  }
}

export async function onRequestPost(context) {
  const { env, request } = context;

  if (request.method !== 'POST') {
    return buildJsonResponse(false, 'Método não permitido.', 405);
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return buildJsonResponse(false, GENERIC_VALIDATION_ERROR.message, 400);
  }

  const validation = validateContactPayload(payload);

  if (!validation.ok) {
    return buildJsonResponse(false, validation.message, validation.status || 400);
  }

  const turnstileSecret = env.TURNSTILE_SECRET_KEY;
  const turnstileToken = payload['cf-turnstile-response'] || payload.turnstileToken || '';

  if (turnstileSecret) {
    const turnstileValid = await verifyTurnstile(turnstileSecret, turnstileToken);

    if (!turnstileValid) {
      return buildJsonResponse(false, GENERIC_VALIDATION_ERROR.message, 400);
    }
  }

  const resendApiKey = env.RESEND_API_KEY;
  const destinationEmail = env.CONTACT_EMAIL;
  const fromEmail = env.CONTACT_FROM;

  if (!resendApiKey || !destinationEmail || !fromEmail) {
    return buildJsonResponse(false, GENERIC_INTERNAL_ERROR.message, 500);
  }

  try {
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: fromEmail,
      to: [destinationEmail],
      replyTo: validation.data.email,
      subject: 'Novo contato - StackByte',
      html: buildContactHtml(validation.data),
      text: buildPlainTextEmail(validation.data),
    });

    return buildJsonResponse(true, 'Mensagem enviada com sucesso.', 200);
  } catch {
    return buildJsonResponse(false, GENERIC_INTERNAL_ERROR.message, 500);
  }
}

export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return buildJsonResponse(false, 'Método não permitido.', 405);
  }

  return onRequestPost(context);
}
