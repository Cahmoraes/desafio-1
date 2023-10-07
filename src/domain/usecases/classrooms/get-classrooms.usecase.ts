import { ClassRoom } from '@/domain/entities/classroom.entity'
import { ClassRoomsRepository } from '@/domain/repositories/classrooms.repository'

interface GetClassRoomUseCaseInput {
  classroomId: string
}

interface GetClassRoomUseCaseOutput {
  classroom: ClassRoom
}

export class GetClassRoomUseCase {
  constructor(private readonly classroomsRepository: ClassRoomsRepository) {}

  public async execute({
    classroomId,
  }: GetClassRoomUseCaseInput): Promise<GetClassRoomUseCaseOutput> {
    const classroom = await this.classroomsRepository.classroomOfId(classroomId)
    if (!classroom) {
      throw new Error(`ClassRoom of id [${classroomId}] not found`)
    }
    return {
      classroom,
    }
  }
}
