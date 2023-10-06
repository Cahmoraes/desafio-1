import { CreateStudentUseCase } from './create-student.usecase'
import { InMemoryStudentsRepository } from '@/infra/repositories/in-memory/in-memory-students.repository'
import { StudentProps } from '@/domain/entities/student.entity'

describe('Create Student Use Case', () => {
  let sut: CreateStudentUseCase
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
    sut = new CreateStudentUseCase(studentsRepository)
  })

  test('Deve criar um Student', async () => {
    await sut.execute(dummyStudent)

    expect(studentsRepository.data.size).toBe(1)
    expect(studentsRepository.data.toArray()[0].name).toEqual('any_name')
    expect(studentsRepository.data.toArray()[0].lastName).toEqual(
      'any_sobrenome',
    )
    expect(studentsRepository.data.toArray()[0].fullName).toEqual(
      'any_name any_sobrenome',
    )

    expect(studentsRepository.data.toArray()[0].cpf.toString()).toEqual(
      'any_cpf',
    )

    expect(
      studentsRepository.data.toArray()[0].allergies[0].toString(),
    ).toEqual('any_allergy')

    expect(studentsRepository.data.toArray()[0].blood).toEqual('A+')

    expect(
      studentsRepository.data.toArray()[0].medication[0].toString(),
    ).toEqual('any_medication')

    expect(studentsRepository.data.toArray()[0].registrationDate).toEqual(
      dummyStudent.registrationDate,
    )

    expect(studentsRepository.data.toArray()[0].parentId.toString()).toEqual(
      dummyStudent.parentId,
    )

    expect(studentsRepository.data.toArray()[0].birthDay).toEqual(
      dummyStudent.birthDay,
    )
  })
})
