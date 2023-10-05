import { BloodTypes } from '@/core/enums/blood-types.enum'
import { Bloody } from './blood'

describe('Bloody', () => {
  test('Deve criar um Bloody', () => {
    const blood = Bloody.create(BloodTypes['A+'])
    expect(blood).toBeInstanceOf(Bloody)
    expect(blood.toString()).toBe(BloodTypes['A+'])
  })

  test('Deve cria um Blood do tipo A+', () => {
    const blood = Bloody.create(BloodTypes['A+'])
    expect(blood.type).toBe(BloodTypes['A+'])
  })

  test('Deve cria um Blood do tipo B+', () => {
    const blood = Bloody.create(BloodTypes['B+'])
    expect(blood.type).toBe(BloodTypes['B+'])
  })

  test('Deve cria um Blood do tipo AB+', () => {
    const blood = Bloody.create(BloodTypes['AB+'])
    expect(blood.type).toBe(BloodTypes['AB+'])
  })

  test('Deve cria um Blood do tipo O+', () => {
    const blood = Bloody.create(BloodTypes['O+'])
    expect(blood.type).toBe(BloodTypes['O+'])
  })

  test('Deve cria um Blood do tipo A-', () => {
    const blood = Bloody.create(BloodTypes['A-'])
    expect(blood.type).toBe(BloodTypes['A-'])
  })

  test('Deve cria um Blood do tipo B-', () => {
    const blood = Bloody.create(BloodTypes['B-'])
    expect(blood.type).toBe(BloodTypes['B-'])
  })

  test('Deve cria um Blood do tipo AB-', () => {
    const blood = Bloody.create(BloodTypes['AB-'])
    expect(blood.type).toBe(BloodTypes['AB-'])
  })

  test('Deve cria um Blood do tipo O-', () => {
    const blood = Bloody.create(BloodTypes['O-'])
    expect(blood.type).toBe(BloodTypes['O-'])
  })

  test('Deve cria um Blood do tipo O-', () => {
    const blood = Bloody.create(BloodTypes['O-'])
    expect(blood.type).toBe(BloodTypes['O-'])
  })

  test('Deve retornar false quando comparado com qualquer objeto que não seja um Blood', () => {
    const blood = Bloody.create(BloodTypes['A+'])
    expect(blood.equals({})).toBeFalsy()
  })

  test('Deve comparar dois Bloods do mesmo tipo', () => {
    const blood = Bloody.create(BloodTypes['A+'])
    expect(blood.equals(Bloody.create(BloodTypes['A+']))).toBeTruthy()
  })

  test('Deve comparar dois Bloods de tipos diferentes', () => {
    const blood = Bloody.create(BloodTypes['A+'])
    expect(blood.equals(Bloody.create(BloodTypes['B+']))).toBeFalsy()
  })
})
