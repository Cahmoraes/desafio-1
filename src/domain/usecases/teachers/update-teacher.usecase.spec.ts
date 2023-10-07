import { InMemoryTeachersRepository } from '@/infra/repositories/in-memory/in-memory-teachers.repository'
import { UpdateTeacherUseCase } from './update-teacher.usecase'
import { Teacher, TeacherProps } from '@/domain/entities/teacher.entity'

describe('Update Teacher Use Case', () => {
  let sut: UpdateTeacherUseCase
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
    sut = new UpdateTeacherUseCase(teachersRepository)
  })

  test('Deve criar um Teacher', async () => {
    const teacher = Teacher.create(dummyTeacher)
    await teachersRepository.save(teacher)

    await sut.execute({
      teacherId: teacher.id.toString(),
      fields: {
        firstName: 'change_name',
        lastName: 'change_lastName',
      },
    })

    const repositoryData = teachersRepository.data.toArray()
    expect(repositoryData.length).toBe(1)
    expect(repositoryData[0].id.equals(teacher.id)).toBeTruthy()
    expect(repositoryData[0].name).toEqual('change_name')
    expect(repositoryData[0].lastName).toEqual('change_lastName')
    expect(repositoryData[0].cpf.toString()).toEqual(dummyTeacher.cpf)
  })

  test('Deve gerar um erro ao tentar atualizar um Teacher inexistente', async () => {
    await expect(() =>
      sut.execute({ teacherId: 'inexistent_id', fields: {} }),
    ).rejects.toThrowError('Teacher of id [inexistent_id] not found')
  })
})
