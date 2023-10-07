import { InMemoryStudentsRepository } from '@/infra/repositories/in-memory/in-memory-students.repository'
import { DeleteStudentUseCase } from './delete-student.usecase'
import { Student, StudentProps } from '@/domain/entities/student.entity'

describe('Delete Student Use Case', () => {
  let sut: DeleteStudentUseCase
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
    sut = new DeleteStudentUseCase(studentsRepository)
  })

  test('Deve criar um Student', async () => {
    const student = Student.create(dummyStudent)
    await studentsRepository.save(student)

    await sut.execute({
      studentId: student.id.toString(),
    })

    expect(studentsRepository.data.size).toBe(0)
  })

  test('Deve gerar um erro ao tentar deletar um Student não existente', async () => {
    await expect(() =>
      sut.execute({ studentId: 'any_id' }),
    ).rejects.toThrowError('Student of id [any_id] not found')
  })
})
