import { Specialization } from './specialization'

describe('Specialization Value Object', () => {
  test('Deve criar uma Specialization', () => {
    const specialization = Specialization.create('Desenvolvimento de Software')
    expect(specialization.toString()).toBe('Desenvolvimento de Software')
  })

  test('Deve comprar duas especializações iguais', () => {
    const specialization1 = Specialization.create('Desenvolvimento de Software')
    const specialization2 = Specialization.create('Desenvolvimento de Software')
    expect(specialization1.equals(specialization2)).toBeTruthy()
    expect(specialization2.equals(specialization1)).toBeTruthy()
    expect(specialization1.toString()).toBe('Desenvolvimento de Software')
    expect(specialization2.toString()).toBe('Desenvolvimento de Software')
  })

  test('Deve comparar duas especializações diferentes', () => {
    const specialization1 = Specialization.create('Desenvolvimento de Software')
    const specialization2 = Specialization.create('Web Design')
    expect(specialization1.equals(specialization2)).toBeFalsy()
    expect(specialization2.equals(specialization1)).toBeFalsy()
    expect(specialization1.toString()).toBe('Desenvolvimento de Software')
    expect(specialization2.toString()).toBe('Web Design')
  })

  test('Deve retornar false quando comparado com qualquer objeto que não seja um Specialization', () => {
    const specialization = Specialization.create('Desenvolvimento de Software')
    expect(specialization.equals({})).toBeFalsy()
  })
})
