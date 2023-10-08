import { InMemoryStudentsRepository } from '@/infra/repositories/in-memory/in-memory-students.repository'
import { Student, StudentProps } from '@/domain/entities/student.entity'
import { UpdateStudentUseCase } from './update-student.usecase'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'

describe('Update Student Use Case', () => {
  let sut: UpdateStudentUseCase
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
    sut = new UpdateStudentUseCase(studentsRepository)
  })

  test('Deve criar um Student', async () => {
    const student = Student.create(dummyStudent)
    await studentsRepository.save(student)

    await sut.execute({
      studentId: student.id.toString(),
      fields: {
        firstName: 'change_name',
        lastName: 'change_lastName',
        allergies: ['change_allergy'],
      },
    })

    const repositoryData = studentsRepository.data.toArray()
    expect(repositoryData.length).toBe(1)
    expect(repositoryData[0].id.equals(student.id)).toBeTruthy()
    expect(repositoryData[0].name).toEqual('change_name')
    expect(repositoryData[0].lastName).toEqual('change_lastName')
    expect(repositoryData[0].cpf.toString()).toEqual(dummyStudent.cpf)
    expect(repositoryData[0].parentId?.toString()).toEqual(
      dummyStudent.parentId,
    )
    expect(repositoryData[0].allergies[0].toString()).toEqual('change_allergy')
  })

  test('Deve gerar um erro ao tentar atualizar um Student inexistente', async () => {
    await expect(() =>
      sut.execute({ studentId: 'inexistent_id', fields: {} }),
    ).rejects.toThrowError(
      new ResourceNotFoundError('Student of id [inexistent_id] not found'),
    )
  })
})
