import { InMemoryTeachersRepository } from '@/infra/repositories/in-memory/in-memory-teachers.repository'
import { DeleteTeacherUseCase } from './delete-teacher.usecase'
import { Teacher, TeacherProps } from '@/domain/entities/teacher.entity'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'

describe('Delete Teacher Use Case', () => {
  let sut: DeleteTeacherUseCase
  let teachersRepository: InMemoryTeachersRepository
  const dummyTeacher: TeacherProps = {
    firstName: 'any_name',
    lastName: 'any_lastName',
    cpf: 'any_cpf',
    phone: 'any_phone',
    email: 'any_email',
    hiringDate: new Date(),
    wage: 1000,
    specialization: 'any_specialization',
  }

  beforeEach(() => {
    teachersRepository = new InMemoryTeachersRepository()
    sut = new DeleteTeacherUseCase(teachersRepository)
  })

  test('Deve criar um Teacher', async () => {
    const teacher = Teacher.create(dummyTeacher)
    await teachersRepository.save(teacher)

    await sut.execute({
      teacherId: teacher.id.toString(),
    })

    expect(teachersRepository.data.size).toBe(0)
  })

  test('Deve gerar um erro ao tentar deletar um Teacher não existente', async () => {
    await expect(() =>
      sut.execute({ teacherId: 'any_id' }),
    ).rejects.toThrowError(
      new ResourceNotFoundError('Teacher of id [any_id] not found'),
    )
  })
})
