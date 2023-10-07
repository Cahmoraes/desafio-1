import { InMemoryTeachersRepository } from '@/infra/repositories/in-memory/in-memory-teachers.repository'
import { CreateTeacherUseCase } from './create-teacher.usecase'
import { TeacherProps } from '@/domain/entities/teacher.entity'

describe('Create Teacher Use Case', () => {
  let sut: CreateTeacherUseCase
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
    sut = new CreateTeacherUseCase(teachersRepository)
  })

  test('Deve criar um Teacher', async () => {
    await sut.execute(dummyTeacher)

    expect(teachersRepository.data.size).toBe(1)
    expect(teachersRepository.data.toArray()[0].name).toEqual(
      dummyTeacher.firstName,
    )
    expect(teachersRepository.data.toArray()[0].lastName).toEqual(
      dummyTeacher.lastName,
    )
    expect(teachersRepository.data.toArray()[0].fullName).toEqual(
      `${dummyTeacher.firstName} ${dummyTeacher.lastName}`,
    )
    expect(teachersRepository.data.toArray()[0].cpf.toString()).toEqual(
      dummyTeacher.cpf,
    )
    expect(teachersRepository.data.toArray()[0].phone.toString()).toEqual(
      dummyTeacher.phone,
    )
    expect(teachersRepository.data.toArray()[0].email.toString()).toEqual(
      dummyTeacher.email,
    )
  })
})
