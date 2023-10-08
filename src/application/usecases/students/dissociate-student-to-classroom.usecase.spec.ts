import { InMemoryStudentsRepository } from '@/infra/repositories/in-memory/in-memory-students.repository'
import { Student, StudentProps } from '@/domain/entities/student.entity'
import { InMemoryClassRoomsRepository } from '@/infra/repositories/in-memory/in-memory-classrooms.repository'
import { DissociateStudentToClassRoomUseCase } from './dissociate-student-to-classroom.usecase'
import { ClassRoom, ClassRoomProps } from '@/domain/entities/classroom.entity'

describe('Dissociate Student to a ClassRoom Use Case', () => {
  let sut: DissociateStudentToClassRoomUseCase
  let studentsRepository: InMemoryStudentsRepository
  let classRoomsRepository: InMemoryClassRoomsRepository
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
  const dummyClassRoom: ClassRoomProps = {
    maxStudentsNumber: 1,
    minAge: 1,
    discipline: 'any_discipline',
    duration: 1,
  }

  beforeEach(() => {
    classRoomsRepository = new InMemoryClassRoomsRepository()
    studentsRepository = new InMemoryStudentsRepository()
    sut = new DissociateStudentToClassRoomUseCase(
      studentsRepository,
      classRoomsRepository,
    )
  })

  test('Deve desassociar um Student a um ClassRoom', async () => {
    const student = Student.create(dummyStudent)
    await studentsRepository.save(student)
    const classRoom = ClassRoom.create(dummyClassRoom, {
      char: 'C',
      number: 23,
      turn: 'M',
    })
    student.associateToClassRoom(classRoom.id)
    classRoom.addStudent(student.id.toString())
    await classRoomsRepository.save(classRoom)
    await sut.execute({
      studentId: student.id.toString(),
      classRoomId: classRoom.id.toString(),
    })
    expect(classRoom.studentsIds.includes(student.id.toString())).toBeFalsy()
    expect(student.classRoom?.equals(classRoom.id)).toBeFalsy()
    expect(student.classRoom).toBeUndefined()
  })

  test('Deve gerar erro ao tentar desassociar um Student inexistente', async () => {
    await expect(() =>
      sut.execute({
        studentId: 'inexistent_id',
        classRoomId: 'inexistent_id',
      }),
    ).rejects.toThrowError('Student of id [inexistent_id] not found')
  })

  test('Deve gerar erro ao tentar desassociar um Student de uma ClassRoom inexistente', async () => {
    const student = Student.create(dummyStudent)
    await studentsRepository.save(student)

    await expect(() =>
      sut.execute({
        studentId: student.id.toString(),
        classRoomId: 'inexistent_id',
      }),
    ).rejects.toThrowError('ClassRoom of id [inexistent_id] not found')
  })
})
