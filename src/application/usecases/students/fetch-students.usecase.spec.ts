import { InMemoryStudentsRepository } from '@/infra/repositories/in-memory/in-memory-students.repository'
import { FetchStudentsUseCase } from './fetch-students.usecase'
import { Student, StudentProps } from '@/domain/entities/student.entity'

describe('Fetch Students Use Case', async () => {
  let sut: FetchStudentsUseCase
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
    sut = new FetchStudentsUseCase(studentsRepository)
  })

  test('Deve listar Students', async () => {
    for (let i = 0; i < 22; i++) {
      const student = Student.create(dummyStudent, `id-${i}`)
      studentsRepository.save(student)
    }

    const { students } = await sut.execute({
      page: 2,
    })

    expect(students).toHaveLength(2)
    expect(students[0].id.toString()).toBe('id-20')
    expect(students[1].id.toString()).toBe('id-21')
  })
})
