import { InMemoryTeachersRepository } from '@/infra/repositories/in-memory/in-memory-teachers.repository'
import { GetTeacherUseCase } from './get-teacher.usecase'
import { Teacher, TeacherProps } from '@/domain/entities/teacher.entity'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'

describe('Get Teacher Use Case', async () => {
  let sut: GetTeacherUseCase
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
    sut = new GetTeacherUseCase(teachersRepository)
  })

  test('Deve listar Teachers', async () => {
    for (let i = 0; i < 22; i++) {
      const teacher = Teacher.create(dummyTeacher, `id-${i}`)
      teachersRepository.save(teacher)
    }

    const { teacher } = await sut.execute({
      teacherId: 'id-20',
    })

    expect(teacher.id.toString()).toBe('id-20')
  })

  test('Deve gerar um erro ao tentar deletar um Teacher não existente', async () => {
    await expect(() =>
      sut.execute({ teacherId: 'any_id' }),
    ).rejects.toThrowError(
      new ResourceNotFoundError('Teacher of id [any_id] not found'),
    )
  })
})
