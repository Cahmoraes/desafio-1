import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'
import { TeachersRepository } from '@/application/repositories/teachers.repository'
import { Teacher } from '@/domain/entities/teacher.entity'

interface GetTeacherUseCaseInput {
  teacherId: string
}

interface GetTeacherUseCaseOutput {
  teacher: Teacher
}

export class GetTeacherUseCase {
  constructor(private readonly teachersRepository: TeachersRepository) {}

  public async execute({
    teacherId,
  }: GetTeacherUseCaseInput): Promise<GetTeacherUseCaseOutput> {
    const teacher = await this.teachersRepository.teacherOfId(teacherId)
    if (!teacher) {
      throw new ResourceNotFoundError(`Teacher of id [${teacherId}] not found`)
    }
    return {
      teacher,
    }
  }
}
