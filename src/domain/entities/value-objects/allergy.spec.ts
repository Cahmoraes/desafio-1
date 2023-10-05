import { Allergy } from './allergy'

describe('Allergy', () => {
  test('Deve criar um Allergy', () => {
    const allergy = Allergy.create('any_allergy')
    expect(allergy).toBeInstanceOf(Allergy)
    expect(allergy.toString()).toBe('any_allergy')
  })

  test('Deve retornar false quando comparado com qualquer objeto que não seja um Allergy', () => {
    const allergy = Allergy.create('any_allergy')
    expect(allergy.equals({})).toBeFalsy()
  })

  test('Deve retornar true quando comparado com um Allergy', () => {
    const allergy = Allergy.create('any_allergy')
    expect(allergy.equals(Allergy.create('any_allergy'))).toBeTruthy()
  })

  test('Deve retornar false quando comparado com um Allergy diferente', () => {
    const allergy = Allergy.create('any_allergy')
    expect(allergy.equals(Allergy.create('any_other_allergy'))).toBeFalsy()
  })
})
