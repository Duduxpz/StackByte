import test from 'node:test';
import assert from 'node:assert/strict';

import { validateContactPayload } from '../functions/api/contact.js';

test('rejects honeypot payloads and invalid email', () => {
  const result = validateContactPayload({
    name: 'Alice',
    email: 'not-an-email',
    whatsapp: '(11) 99999-9999',
    company: 'StackByte',
    message: 'Olá',
    website: 'https://spam.example',
  });

  assert.equal(result.ok, false);
  assert.match(result.message, /Verifique os dados enviados\./i);
});

test('accepts a valid payload within limits', () => {
  const result = validateContactPayload({
    name: 'Alice Example',
    email: 'alice@example.com',
    whatsapp: '(11) 99999-9999',
    company: 'StackByte',
    message: 'Gostaria de saber mais sobre o desenvolvimento do meu projeto.',
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.name, 'Alice Example');
});
