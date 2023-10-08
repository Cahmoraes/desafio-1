import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'
import { StudentsRepository } from '@/application/repositories/students.repository'
import { StudentProps } from '@/domain/entities/student.entity'

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
    if (!student) {
      throw new ResourceNotFoundError(`Student of id [${studentId}] not found`)
    }
    const clonedStudent = student.clone(fields)
    await this.studentsRepository.update(clonedStudent)
  }
}
