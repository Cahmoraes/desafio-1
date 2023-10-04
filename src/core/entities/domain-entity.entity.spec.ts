import { DomainEntity } from './domain-entity.entity'
import { UniqueEntityId } from './value-objects/unique-entity'

describe('DomainEntity', () => {
  interface FakeProps {
    name: string
  }

  class FakeEntity extends DomainEntity<FakeProps> {
    public static create(
      props: FakeProps,
      id?: UniqueEntityId | string,
    ): FakeEntity {
      return new FakeEntity(props, id)
    }
  }

  test('Deve criar um DomainEntity', () => {
    const entity = FakeEntity.create({
      name: 'any_name',
    })
    expect(entity).toBeInstanceOf(FakeEntity)
    expect(entity.id.toString()).toEqual(expect.any(String))
  })

  test('Deve criar um DomainEntity com um id específico', () => {
    const entity = FakeEntity.create(
      {
        name: 'any_name',
      },
      'any_id',
    )
    expect(entity.id.toString()).toEqual('any_id')
  })

  test('Deve restaurar um DomainEntity com um UniqueId específico', () => {
    const uniqueEntityId = new UniqueEntityId('any_id')
    const entity = FakeEntity.create(
      {
        name: 'any_name',
      },
      uniqueEntityId,
    )
    expect(entity.id.toString()).toEqual('any_id')
  })
})
