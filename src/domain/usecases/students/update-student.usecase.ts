import { StudentProps } from '@/domain/entities/student.entity'
import { StudentsRepository } from '@/domain/repositories/students.repository'

interface UpdateStudentUseCaseInput {
  studentId: string
  fields: Partial<StudentProps>
}
type UpdateStudentUseCaseOutput = void

export class UpdateStudentUseCase {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  public async execute({
    studentId,
    fields,
  }: UpdateStudentUseCaseInput): Promise<UpdateStudentUseCaseOutput> {
    const student = await this.studentsRepository.studentOfId(studentId)
    if (!student) throw new Error(`Student of id [${studentId}] not found`)
    const newStudent = student.clone(fields)
    await this.studentsRepository.update(newStudent)
  }
}
