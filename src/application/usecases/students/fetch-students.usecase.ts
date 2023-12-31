import { StudentsRepository } from '@/application/repositories/students.repository'
import { Student } from '@/domain/entities/student.entity'

interface FetchStudentsUseCaseInput {
  page: number
}

interface FetchStudentsUseCaseOutput {
  students: Student[]
}

export class FetchStudentsUseCase {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  public async execute({
    page = 0,
  }: FetchStudentsUseCaseInput): Promise<FetchStudentsUseCaseOutput> {
    const students = await this.studentsRepository.allStudents(page)
    return {
      students,
    }
  }
}
