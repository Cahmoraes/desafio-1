import { ClassRoom, ClassRoomProps } from '@/domain/entities/classroom.entity'
import { ClassRoomsRepository } from '../../repositories/classrooms.repository'

type CreateClassRoomUseCaseInput = ClassRoomProps
type CreateClassRoomUseCaseOutput = void

export class CreateClassRoomUseCase {
  constructor(private readonly classroomsRepository: ClassRoomsRepository) {}

  public async execute(
    input: CreateClassRoomUseCaseInput,
  ): Promise<CreateClassRoomUseCaseOutput> {
    const classroom = ClassRoom.create(input)
    await this.classroomsRepository.save(classroom)
  }
}
