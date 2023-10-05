import { Cpf } from './cpf'

describe('Cpf', () => {
  test('Deve criar um Cpf', () => {
    const cpf = Cpf.create('any_cpf')
    expect(cpf).toBeInstanceOf(Cpf)
    expect(cpf.toString()).toBe('any_cpf')
  })

  test('Deve comparar dois Cpf iguais', () => {
    const cpf1 = Cpf.create('any_cpf')
    const cpf2 = Cpf.create('any_cpf')
    expect(cpf1.equals(cpf2)).toBeTruthy()
    expect(cpf2.equals(cpf1)).toBeTruthy()
  })

  test('Deve comparar dois Cpf diferentes', () => {
    const cpf1 = Cpf.create('any_cpf')
    const cpf2 = Cpf.create('any_cpf2')
    expect(cpf1.equals(cpf2)).toBeFalsy()
    expect(cpf2.equals(cpf1)).toBeFalsy()
  })

  test('Deve retornar false quando comparado com qualquer objeto que não seja um Cpf', () => {
    const cpf = Cpf.create('any_cpf')
    expect(cpf.equals({})).toBeFalsy()
  })
})
