import { Name } from './name'

describe('Name Value Object', () => {
  test('Deve criar um nome', () => {
    const name = Name.create('any_name', 'any_sobrenome')
    expect(name.firstName).toBe('any_name')
    expect(name.lastName).toBe('any_sobrenome')
    expect(name.fullName).toBe('any_name any_sobrenome')
  })

  test('Deve retornar o nome completo', () => {
    const name = Name.create('any_name', 'any_sobrenome')
    expect(name.fullName).toBe('any_name any_sobrenome')
    expect(name.toString()).toBe('any_name any_sobrenome')
  })

  test('Deve comparar dois nomes iguais', () => {
    const name1 = Name.create('any_name', 'any_sobrenome')
    const name2 = Name.create('any_name', 'any_sobrenome')
    expect(name1.equals(name2)).toBeTruthy()
    expect(name2.equals(name1)).toBeTruthy()
    expect(name1.toString()).toBe('any_name any_sobrenome')
    expect(name2.toString()).toBe('any_name any_sobrenome')
  })

  test('Deve comparar dois nomes diferentes', () => {
    const name1 = Name.create('any_name', 'any_sobrenome')
    const name2 = Name.create('any_name2', 'any_sobrenome')
    expect(name1.equals(name2)).toBeFalsy()
    expect(name2.equals(name1)).toBeFalsy()
    expect(name1.toString()).toBe('any_name any_sobrenome')
    expect(name2.toString()).toBe('any_name2 any_sobrenome')
  })

  test('Deve retornar false quando comparado com qualquer objeto que não seja um Name', () => {
    const name1 = Name.create('any_name', 'any_sobrenome')
    const anyObject = { any: 'any' }
    expect(name1.equals(anyObject)).toBeFalsy()
  })
})
