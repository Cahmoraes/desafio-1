import { TeachersRepository } from '@/application/repositories/teachers.repository'

interface DeleteTeacherUseCaseInput {
  teacherId: string
}

type DeleteTeacherUseCaseOutput = void

export class DeleteTeacherUseCase {
  constructor(private readonly teachersRepository: TeachersRepository) {}

  public async execute({
    teacherId,
  }: DeleteTeacherUseCaseInput): Promise<DeleteTeacherUseCaseOutput> {
    const teacher = await this.teachersRepository.teacherOfId(teacherId)
    if (!teacher) throw new Error(`Teacher of id [${teacherId}] not found`)
    await this.teachersRepository.delete(teacher)
  }
}
