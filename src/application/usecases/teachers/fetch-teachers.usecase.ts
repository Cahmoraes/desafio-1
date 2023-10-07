import { TeachersRepository } from '@/application/repositories/teachers.repository'
import { Teacher } from '@/domain/entities/teacher.entity'

interface FetchTeachersUseCaseInput {
  page: number
}

interface FetchTeachersUseCaseOutput {
  teachers: Teacher[]
}

export class FetchTeachersUseCase {
  constructor(private readonly teachersRepository: TeachersRepository) {}

  public async execute({
    page = 0,
  }: FetchTeachersUseCaseInput): Promise<FetchTeachersUseCaseOutput> {
    const teachers = await this.teachersRepository.allTeachers(page)
    return {
      teachers,
    }
  }
}
