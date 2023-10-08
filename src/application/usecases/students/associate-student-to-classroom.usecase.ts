import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'
import { ClassRoomsRepository } from '@/application/repositories/classrooms.repository'
import { StudentsRepository } from '@/application/repositories/students.repository'

interface AssociateStudentToClassRoomUseCaseInput {
  studentId: string
  classRoomId: string
}

type AssociateStudentToClassRoomUseCaseOutput = void

export class AssociateStudentToClassRoomUseCase {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly classRoomsRepository: ClassRoomsRepository,
  ) {}

  public async execute({
    studentId,
    classRoomId,
  }: AssociateStudentToClassRoomUseCaseInput): Promise<AssociateStudentToClassRoomUseCaseOutput> {
    const student = await this.studentsRepository.studentOfId(studentId)
    if (!student) {
      throw new ResourceNotFoundError(`Student of id [${studentId}] not found`)
    }
    const classRoom = await this.classRoomsRepository.classroomOfId(classRoomId)
    if (!classRoom) {
      throw new ResourceNotFoundError(
        `ClassRoom of id [${classRoomId}] not found`,
      )
    }
    student.associateToClassRoom(classRoom.id)
    classRoom.addStudent(studentId)
    await this.studentsRepository.update(student)
    await this.classRoomsRepository.update(classRoom)
  }
}
