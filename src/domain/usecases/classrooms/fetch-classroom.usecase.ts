import { ClassRoom } from '@/domain/entities/classroom.entity'
import { ClassRoomsRepository } from '@/domain/repositories/classrooms.repository'

interface FetchClassRoomsUseCaseInput {
  page: number
}

interface FetchClassRoomsUseCaseOutput {
  classrooms: ClassRoom[]
}

export class FetchClassRoomsUseCase {
  constructor(private readonly classroomsRepository: ClassRoomsRepository) {}

  public async execute({
    page = 0,
  }: FetchClassRoomsUseCaseInput): Promise<FetchClassRoomsUseCaseOutput> {
    const classrooms = await this.classroomsRepository.allClassRooms(page)
    return {
      classrooms,
    }
  }
}
