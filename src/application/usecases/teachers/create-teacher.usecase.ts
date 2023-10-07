import { Teacher, TeacherProps } from '@/domain/entities/teacher.entity'
import { TeachersRepository } from '../../repositories/teachers.repository'

type CreateTeacherUseCaseInput = TeacherProps
type CreateTeacherUseCaseOutput = void

export class CreateTeacherUseCase {
  constructor(private readonly teachersRepository: TeachersRepository) {}

  public async execute(
    input: CreateTeacherUseCaseInput,
  ): Promise<CreateTeacherUseCaseOutput> {
    const teacher = Teacher.create(input)
    await this.teachersRepository.save(teacher)
  }
}
