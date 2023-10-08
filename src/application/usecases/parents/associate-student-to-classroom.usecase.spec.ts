import { InMemoryStudentsRepository } from '@/infra/repositories/in-memory/in-memory-students.repository'
import { Student, StudentProps } from '@/domain/entities/student.entity'
import { InMemoryClassRoomsRepository } from '@/infra/repositories/in-memory/in-memory-classrooms.repository'
import { AssociateStudentToClassRoomUseCase } from './associate-student-to-classroom.usecase'
import { ClassRoom, ClassRoomProps } from '@/domain/entities/classroom.entity'

describe('Associate Student to a ClassRoom Use Case', () => {
  let sut: AssociateStudentToClassRoomUseCase
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
    sut = new AssociateStudentToClassRoomUseCase(
      studentsRepository,
      classRoomsRepository,
    )
  })

  test('Deve criar um Parent', async () => {
    const student = Student.create(dummyStudent)
    await studentsRepository.save(student)
    const classRoom = ClassRoom.create(dummyClassRoom, {
      char: 'C',
      number: 23,
      turn: 'M',
    })
    await classRoomsRepository.save(classRoom)
    await sut.execute({
      studentId: student.id.toString(),
      classRoomId: classRoom.id.toString(),
    })
    expect(classRoom.studentsIds.includes(student.id.toString())).toBeTruthy()
    expect(student.classRoom?.equals(classRoom.id)).toBeTruthy()
  })
})
