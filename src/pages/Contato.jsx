import { useState } from 'react';

import {
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';

import Navbar from '../components/stackbyte/Navbar';
import Footer from '../components/stackbyte/Footer';
import FloatingWhatsApp from '../components/stackbyte/FloatingWhatsApp';
import PageHero from '../components/stackbyte/PageHero';

const initialForm = {
  name: '',
  email: '',
  whatsapp: '',
  company: '',
  message: '',
  website: '',
  cfTurnstileResponse: '',
};

const channels = [
  {
    icon: Mail,
    label: 'E-mail',
    value: 'contato@stackbyte.com.br',
  },
  {
    icon: Clock,
    label: 'Prazo de resposta',
    value: 'Até 48h úteis',
  },
  {
    icon: MapPin,
    label: 'Atendimento',
    value: 'Remoto, todo o Brasil',
  },
];

export default function Contato() {
  const [form, setForm] =
    useState(initialForm);

  const [status, setStatus] =
    useState('idle');

  const [error, setError] =
    useState('');

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (status !== 'idle') {
      setStatus('idle');
      setError('');
    }
  };

  const handleSubmit = async (
    event,
  ) => {
    event.preventDefault();

    const payload = {
      ...form,
    };

    delete payload.website;
    delete payload.cfTurnstileResponse;

    setStatus('loading');
    setError('');

    try {
      const response = await fetch(
        '/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Não foi possível enviar sua mensagem.',
        );
      }

      setStatus('success');
      setForm(initialForm);
    } catch (submitError) {
      setStatus('error');

      setError(
        submitError.message ||
          'Ocorreu um erro ao enviar sua mensagem.',
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#080505] text-white">
      <Navbar />

      <PageHero
        eyebrow="Empresa"
        title="Vamos tirar sua ideia do papel."
        description="Conte um pouco sobre seu projeto, problema ou necessidade. A StackByte analisa as informações e retorna com os próximos passos."
      />

      <section className="relative overflow-hidden bg-[#080505] py-16 md:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#FD7B01]/[0.035] blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[.72fr_1.28fr]">
          {/* INFO */}

          <div>
            <div className="mb-5 font-['ClashDisplay-Regular'] text-xs uppercase tracking-[0.2em] text-[#FD7B01]">
              Fale conosco
            </div>

            <h2 className="font-['ClashDisplay-Regular'] text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Conte o que você precisa.
            </h2>

            <p className="mt-4 max-w-md font-['ClashDisplay-Regular'] text-sm leading-7 text-white/50">
              Quanto mais detalhes você
              compartilhar, melhor conseguimos
              entender o cenário e preparar uma
              primeira conversa.
            </p>

            <div className="mt-8 space-y-3">
              {channels.map(
                ({
                  icon: Icon,
                  label,
                  value,
                }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-[#FD7B01]/25"
                  >
                    <Icon
                      size={21}
                      className="text-[#FD7B01]"
                    />

                    <div className="mt-4 font-['ClashDisplay-Regular'] text-[11px] uppercase tracking-[0.16em] text-white/30">
                      {label}
                    </div>

                    <div className="mt-1 font-['ClashDisplay-Regular'] text-sm text-white/80">
                      {value}
                    </div>
                  </div>
                ),
              )}
            </div>

            <a
              href="mailto:contato@stackbyte.com.br"
              className="mt-5 inline-flex items-center gap-2 font-['ClashDisplay-Regular'] text-sm text-[#FD7B01] transition hover:text-white"
            >
              Enviar e-mail diretamente
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* FORM */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 shadow-[0_25px_100px_rgba(0,0,0,.2)] backdrop-blur-xl md:p-8">
            {status === 'success' ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FD7B01]/10 text-[#FD7B01]">
                  <CheckCircle2
                    size={30}
                  />
                </div>

                <h3 className="mt-6 font-['ClashDisplay-Regular'] text-2xl font-semibold text-white">
                  Mensagem enviada!
                </h3>

                <p className="mt-3 max-w-md font-['ClashDisplay-Regular'] text-sm leading-6 text-white/50">
                  Recebemos seu contato. A
                  equipe da StackByte vai analisar
                  as informações e retornar em até
                  48 horas úteis.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setStatus('idle')
                  }
                  className="mt-7 rounded-full border border-white/10 px-5 py-3 font-['ClashDisplay-Regular'] text-sm text-white/70 transition hover:border-[#FD7B01]/40 hover:text-white"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Nome"
                    name="name"
                    value={form.name}
                    onChange={
                      handleChange
                    }
                    placeholder="Seu nome"
                    required
                    ariaInvalid={Boolean(form.name && form.name.trim().length < 2)}
                  />

                  <Field
                    label="E-mail"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={
                      handleChange
                    }
                    placeholder="voce@empresa.com"
                    required
                    ariaInvalid={Boolean(form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="WhatsApp"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={
                      handleChange
                    }
                    placeholder="(00) 00000-0000"
                    ariaInvalid={Boolean(form.whatsapp && form.whatsapp.trim().length < 8)}
                  />

                  <Field
                    label="Empresa"
                    name="company"
                    value={form.company}
                    onChange={
                      handleChange
                    }
                    placeholder="Nome da empresa"
                    ariaInvalid={Boolean(form.company && form.company.trim().length < 2)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="font-['ClashDisplay-Regular'] text-xs text-white/55"
                  >
                    Como podemos ajudar?
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={
                      handleChange
                    }
                    required
                    minLength={20}
                    rows={7}
                    aria-invalid={Boolean(form.message && form.message.trim().length < 20)}
                    aria-describedby="contact-error"
                    placeholder="Conte sobre seu projeto, problema, sistema atual ou ideia..."
                    className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 font-['ClashDisplay-Regular'] text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#FD7B01]/60 focus:bg-black/30"
                  />
                </div>

                {status === 'error' && (
                  <div
                    id="contact-error"
                    aria-live="polite"
                    role="alert"
                    className="flex gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-4 text-sm text-red-300"
                  >
                    <AlertCircle
                      size={18}
                      className="mt-0.5 shrink-0"
                    />

                    <span className="font-['ClashDisplay-Regular']">
                      {error}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    status === 'loading'
                  }
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FD7B01] px-5 py-4 font-['ClashDisplay-Regular'] text-sm font-semibold text-black transition hover:bg-[#ff9a3d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensagem
                      <ArrowUpRight
                        size={18}
                        className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </>
                  )}
                </button>

                <p className="text-center font-['ClashDisplay-Regular'] text-[11px] leading-5 text-white/25">
                  Ao enviar, suas informações
                  serão utilizadas apenas para
                  responder ao contato.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />

      <FloatingWhatsApp />
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  ariaInvalid = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-['ClashDisplay-Regular'] text-xs text-white/55"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={ariaInvalid}
        className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 font-['ClashDisplay-Regular'] text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#FD7B01]/60 focus:bg-black/30"
      />
    </div>
  );
}