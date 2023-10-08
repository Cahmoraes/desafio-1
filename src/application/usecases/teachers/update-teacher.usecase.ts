import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'
import { TeachersRepository } from '@/application/repositories/teachers.repository'
import { TeacherProps } from '@/domain/entities/teacher.entity'

interface UpdateTeacherUseCaseInput {
  teacherId: string
  fields: Partial<TeacherProps>
}
type UpdateTeacherUseCaseOutput = void

export class UpdateTeacherUseCase {
  constructor(private readonly teachersRepository: TeachersRepository) {}

  public async execute({
    teacherId,
    fields,
  }: UpdateTeacherUseCaseInput): Promise<UpdateTeacherUseCaseOutput> {
    const teacher = await this.teachersRepository.teacherOfId(teacherId)
    if (!teacher) {
      throw new ResourceNotFoundError(`Teacher of id [${teacherId}] not found`)
    }
    const newTeacher = teacher.clone(fields)
    await this.teachersRepository.update(newTeacher)
  }
}
