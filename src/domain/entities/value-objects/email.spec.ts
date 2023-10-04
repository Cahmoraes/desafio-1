import { Email } from './email'

describe('Email Value Object', () => {
  test('Deve criar um email', () => {
    const email = Email.create('any_email')
    expect(email.toString()).toBe('any_email')
  })

  test('Deve retornar o email completo', () => {
    const email = Email.create('any_email')
    expect(email.toString()).toBe('any_email')
  })

  test('Deve comparar dois emails iguais', () => {
    const email1 = Email.create('any_email')
    const email2 = Email.create('any_email')
    expect(email1.equals(email2)).toBeTruthy()
    expect(email2.equals(email1)).toBeTruthy()
  })

  test('Deve comparar dois emails diferentes', () => {
    const email1 = Email.create('any_email')
    const email2 = Email.create('any_email2')
    expect(email1.equals(email2)).toBeFalsy()
    expect(email2.equals(email1)).toBeFalsy()
  })

  test('Deve retornar false quando comparado com qualquer objeto que não seja um Email', () => {
    const email = Email.create('any_email')
    expect(email.equals({})).toBeFalsy()
  })
})
