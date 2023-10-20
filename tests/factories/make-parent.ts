import { Parent, ParentProps } from '@/domain/entities/parent.entity'
import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity'

export function makeParent(
  props?: Partial<ParentProps>,
  anId?: string | UniqueEntityId,
): Parent {
  return Parent.create(
    {
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: [faker.location.streetAddress()],
      cpf: faker.string.numeric({ length: 11 }).toString(),
      emails: [faker.internet.email()],
      phones: [faker.phone.number()],
      ...props,
    },
    anId ?? faker.string.uuid(),
  )
}
