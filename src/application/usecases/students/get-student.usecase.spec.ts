import { InMemoryStudentsRepository } from '@/infra/repositories/in-memory/in-memory-students.repository'
import { GetStudentUseCase } from './get-student.usecase'
import { Student, StudentProps } from '@/domain/entities/student.entity'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'

describe('Get Student Use Case', async () => {
  let sut: GetStudentUseCase
  let studentsRepository: InMemoryStudentsRepository
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
    studentsRepository = new InMemoryStudentsRepository()
    sut = new GetStudentUseCase(studentsRepository)
  })

  test('Deve listar Students', async () => {
    for (let i = 0; i < 22; i++) {
      const student = Student.create(dummyStudent, `id-${i}`)
      studentsRepository.save(student)
    }

    const { student } = await sut.execute({
      studentId: 'id-20',
    })

    expect(student.id.toString()).toBe('id-20')
  })

  test('Deve gerar um erro ao tentar deletar um Student não existente', async () => {
    await expect(() =>
      sut.execute({ studentId: 'any_id' }),
    ).rejects.toThrowError(
      new ResourceNotFoundError('Student of id [any_id] not found'),
    )
  })
})
