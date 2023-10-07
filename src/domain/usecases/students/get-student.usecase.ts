import { Student } from '@/domain/entities/student.entity'
import { StudentsRepository } from '@/domain/repositories/students.repository'

interface GetStudentUseCaseInput {
  studentId: string
}

interface GetStudentUseCaseOutput {
  student: Student
}

export class GetStudentUseCase {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  public async execute({
    studentId,
  }: GetStudentUseCaseInput): Promise<GetStudentUseCaseOutput> {
    const student = await this.studentsRepository.studentOfId(studentId)
    if (!student) throw new Error(`Student of id [${studentId}] not found`)
    return {
      student,
    }
  }
}
