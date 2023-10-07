import { InMemoryTeachersRepository } from '@/infra/repositories/in-memory/in-memory-teachers.repository'
import { FetchTeachersUseCase } from './fetch-teachers.usecase'
import { Teacher, TeacherProps } from '@/domain/entities/teacher.entity'

describe('Fetch Teachers Use Case', async () => {
  let sut: FetchTeachersUseCase
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
    sut = new FetchTeachersUseCase(teachersRepository)
  })

  test('Deve listar Teachers', async () => {
    for (let i = 0; i < 22; i++) {
      const teacher = Teacher.create(dummyTeacher, `id-${i}`)
      teachersRepository.save(teacher)
    }

    const { teachers } = await sut.execute({
      page: 2,
    })

    expect(teachers).toHaveLength(2)
    expect(teachers[0].id.toString()).toBe('id-20')
    expect(teachers[1].id.toString()).toBe('id-21')
  })
})
