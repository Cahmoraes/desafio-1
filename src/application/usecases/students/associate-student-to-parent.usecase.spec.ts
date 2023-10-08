import { InMemoryParentsRepository } from '@/infra/repositories/in-memory/in-memory-parents.repository'
import { Parent, ParentProps } from '@/domain/entities/parent.entity'
import { AssociateStudentToParentUseCase } from './associate-student-to-parent.usecase'
import { InMemoryStudentsRepository } from '@/infra/repositories/in-memory/in-memory-students.repository'
import { Student, StudentProps } from '@/domain/entities/student.entity'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'

describe('Associate Student to a Parent Use Case', () => {
  let sut: AssociateStudentToParentUseCase
  let parentsRepository: InMemoryParentsRepository
  let studentsRepository: InMemoryStudentsRepository
  const dummyParent: ParentProps = {
    name: 'any_name',
    lastName: 'any_sobrenome',
    phones: ['0123456789', '1234567890'],
    emails: ['any_email'],
    address: ['any_address'],
    cpf: 'any_cpf',
  }
  const dummyStudent: StudentProps = {
    firstName: 'any_name',
    lastName: 'any_sobrenome',
    allergies: ['any_allergy'],
    blood: 'A+',
    birthDay: new Date(),
    medication: ['any_medication'],
    registrationDate: new Date(),
    cpf: 'any_cpf',
    parentId: 'any_parent-id',
  }

  beforeEach(() => {
    parentsRepository = new InMemoryParentsRepository()
    studentsRepository = new InMemoryStudentsRepository()
    sut = new AssociateStudentToParentUseCase(
      studentsRepository,
      parentsRepository,
    )
  })

  test('Deve associar um Student a um Parent', async () => {
    const student = Student.create(dummyStudent)
    await studentsRepository.save(student)
    const parent = Parent.create(dummyParent)
    await parentsRepository.save(parent)

    await sut.execute({
      studentId: student.id.toString(),
      parentId: parent.id.toString(),
    })

    expect(parent.studentIds.includes(student.id.toString())).toBeTruthy()
    expect(student.parentId).toEqual(parent.id.toString())
  })

  test('Deve gerar erro tentar associar a um Student inexistente', async () => {
    await expect(() =>
      sut.execute({
        studentId: 'inexistent_id',
        parentId: 'inexistent_id',
      }),
    ).rejects.toThrowError(
      new ResourceNotFoundError('Student of id [inexistent_id] not found'),
    )
  })

  test('Deve gerar erro tentar associar a um Parent inexistente', async () => {
    const student = Student.create(dummyStudent)
    await studentsRepository.save(student)

    await expect(() =>
      sut.execute({
        studentId: student.id.toString(),
        parentId: 'inexistent_id',
      }),
    ).rejects.toThrowError(
      new ResourceNotFoundError('Parent of id [inexistent_id] not found'),
    )
  })
})
