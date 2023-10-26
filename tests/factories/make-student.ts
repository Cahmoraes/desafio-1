import { Student, StudentProps } from '@/domain/entities/student.entity'
import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity'
import { BloodTypes } from '@/core/enums/blood-types.enum'

export function makeStudent(
  props?: Partial<StudentProps>,
  anId?: string | UniqueEntityId,
): Student {
  return Student.create(
    {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      birthDay: faker.date.birthdate({ min: 18 }),
      blood: faker.helpers.enumValue(BloodTypes),
      medication: [faker.lorem.word()],
      allergies: [faker.lorem.word()],
      registrationDate: faker.date.past(),
      cpf: faker.string.numeric({ length: 11 }).toString(),
      parentId: faker.string.uuid(),
      ...props,
    },
    anId ?? faker.string.uuid(),
  )
}
