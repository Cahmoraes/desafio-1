import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'
import { StudentsRepository } from '@/application/repositories/students.repository'

interface DeleteStudentUseCaseInput {
  studentId: string
}

type DeleteStudentUseCaseOutput = void

export class DeleteStudentUseCase {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  public async execute({
    studentId,
  }: DeleteStudentUseCaseInput): Promise<DeleteStudentUseCaseOutput> {
    const student = await this.studentsRepository.studentOfId(studentId)
    if (!student) {
      throw new ResourceNotFoundError(`Student of id [${studentId}] not found`)
    }
    await this.studentsRepository.delete(student)
  }
}
