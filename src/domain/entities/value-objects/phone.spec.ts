import { Phone } from './phone'

describe('Phone Value Object', () => {
  test('Deve criar um telefone', () => {
    const phone = Phone.create('0123456789')
    expect(phone.toString()).toBe('0123456789')
  })

  test('Deve comprar dois telefones iguais', () => {
    const phone1 = Phone.create('0123456789')
    const phone2 = Phone.create('0123456789')
    expect(phone1.equals(phone2)).toBeTruthy()
    expect(phone2.equals(phone1)).toBeTruthy()
    expect(phone1.toString()).toBe('0123456789')
    expect(phone2.toString()).toBe('0123456789')
  })

  test('Deve comparar dois telefones diferentes', () => {
    const phone1 = Phone.create('0123456789')
    const phone2 = Phone.create('1234567890')
    expect(phone1.equals(phone2)).toBeFalsy()
    expect(phone2.equals(phone1)).toBeFalsy()
    expect(phone1.toString()).toBe('0123456789')
    expect(phone2.toString()).toBe('1234567890')
  })

  test('Deve retornar false quando comparado com qualquer objeto que não seja um Phone', () => {
    const phone = Phone.create('0123456789')
    expect(phone.equals({})).toBeFalsy()
  })
})
