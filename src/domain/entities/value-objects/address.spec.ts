import { Address } from './address'

describe('Address', () => {
  test('Deve criar um Address', () => {
    const address = Address.create('any_address')
    expect(address).toBeInstanceOf(Address)
    expect(address.toString()).toBe('any_address')
  })

  test('Deve comparar dois Address iguais', () => {
    const address1 = Address.create('any_address')
    const address2 = Address.create('any_address')
    expect(address1.equals(address2)).toBeTruthy()
    expect(address2.equals(address1)).toBeTruthy()
  })

  test('Deve comparar dois Address diferentes', () => {
    const address1 = Address.create('any_address')
    const address2 = Address.create('any_address2')
    expect(address1.equals(address2)).toBeFalsy()
    expect(address2.equals(address1)).toBeFalsy()
  })

  test('Deve retornar false quando comparado com qualquer objeto que não seja um Address', () => {
    const address = Address.create('any_address')
    expect(address.equals({})).toBeFalsy()
  })
})
