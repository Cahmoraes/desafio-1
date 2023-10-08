import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'
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
      throw new ResourceNotFoundError(
        `ClassRoom of id [${classroomId}] not found`,
      )
    }
    await this.classroomsRepository.delete(classroom)
  }
}
