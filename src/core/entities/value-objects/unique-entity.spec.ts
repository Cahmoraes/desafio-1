import { UniqueEntityId } from './unique-entity'

describe('UniqueEntityId', () => {
  test('Deve criar um UniqueEntityId', () => {
    const uniqueEntityIdWithoutParameter = new UniqueEntityId()
    expect(uniqueEntityIdWithoutParameter).toBeInstanceOf(UniqueEntityId)
    expect(uniqueEntityIdWithoutParameter.toString()).toEqual(
      expect.any(String),
    )

    const uniqueEntityIdWithParameter = new UniqueEntityId('any_id')
    expect(uniqueEntityIdWithParameter).toBeInstanceOf(UniqueEntityId)
    expect(uniqueEntityIdWithParameter.toString()).toEqual('any_id')

    const uniqueEntityIdWithUniqueEntityIdParameter = new UniqueEntityId(
      uniqueEntityIdWithParameter,
    )
    expect(uniqueEntityIdWithUniqueEntityIdParameter).toBeInstanceOf(
      UniqueEntityId,
    )
    expect(uniqueEntityIdWithUniqueEntityIdParameter.toString()).toEqual(
      'any_id',
    )
  })

  test('Deve comparar dois UniqueEntityId', () => {
    const uniqueEntityIdWithoutParameter = new UniqueEntityId('any_id')
    const uniqueEntityIdWithParameter = new UniqueEntityId('any_id')
    expect(
      uniqueEntityIdWithoutParameter.equals(uniqueEntityIdWithParameter),
    ).toBeTruthy()
    expect(uniqueEntityIdWithParameter.equals(new UniqueEntityId())).toBeFalsy()
  })

  test('Deve retornar false quando comparado com qualquer objeto que não seja um UniqueEntityId', () => {
    const uniqueEntityIdWithoutParameter = new UniqueEntityId('any_id')
    expect(uniqueEntityIdWithoutParameter.equals({})).toBeFalsy()
  })
})
