import { Medication } from './medication'

describe('Medication', () => {
  test('Deve criar um Medication', () => {
    const medication = Medication.create('any_medication')
    expect(medication).toBeInstanceOf(Medication)
    expect(medication.toString()).toBe('any_medication')
  })

  test('Deve retornar false quando comparado com qualquer objeto que não seja um Medication', () => {
    const medication = Medication.create('any_medication')
    expect(medication.equals({})).toBeFalsy()
  })

  test('Deve retornar true quando comparado com um Medication', () => {
    const medication = Medication.create('any_medication')
    expect(medication.equals(Medication.create('any_medication'))).toBeTruthy()
  })

  test('Deve retornar false quando comparado com um Medication diferente', () => {
    const medication = Medication.create('any_medication')
    expect(
      medication.equals(Medication.create('any_other_medication')),
    ).toBeFalsy()
  })
})
