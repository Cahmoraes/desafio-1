import { ClassRoomsRepository } from '@/application/repositories/classrooms.repository'
import { ClassRoom } from '@/domain/entities/classroom.entity'

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
