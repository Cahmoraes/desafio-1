import { ClassRoomsRepository } from '@/application/repositories/classrooms.repository'

interface DeleteClassRoomUseCaseInput {
  classroomId: string
}

type DeleteClassRoomUseCaseOutput = void

export class DeleteClassRoomUseCase {
  constructor(private readonly classroomsRepository: ClassRoomsRepository) {}

  public async execute({
    classroomId,
  }: DeleteClassRoomUseCaseInput): Promise<DeleteClassRoomUseCaseOutput> {
    const classroom = await this.classroomsRepository.classroomOfId(classroomId)
    if (!classroom) {
      throw new Error(`ClassRoom of id [${classroomId}] not found`)
    }
    await this.classroomsRepository.delete(classroom)
  }
}
