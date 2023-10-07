import { ClassRoomProps } from '@/domain/entities/classroom.entity'
import { ClassRoomsRepository } from '@/domain/repositories/classrooms.repository'

interface UpdateClassRoomUseCaseInput {
  classroomId: string
  fields: Partial<ClassRoomProps>
}
type UpdateClassRoomUseCaseOutput = void

export class UpdateClassRoomUseCase {
  constructor(private readonly classroomsRepository: ClassRoomsRepository) {}

  public async execute({
    classroomId,
    fields,
  }: UpdateClassRoomUseCaseInput): Promise<UpdateClassRoomUseCaseOutput> {
    const classroom = await this.classroomsRepository.classroomOfId(classroomId)
    if (!classroom) {
      throw new Error(`ClassRoom of id [${classroomId}] not found`)
    }
    const newClassRoom = classroom.clone(fields)
    await this.classroomsRepository.update(newClassRoom)
  }
}
