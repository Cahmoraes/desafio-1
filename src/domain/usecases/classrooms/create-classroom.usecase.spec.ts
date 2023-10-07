import { InMemoryClassRoomsRepository } from '@/infra/repositories/in-memory/in-memory-classrooms.repository'
import { CreateClassRoomUseCase } from './create-classroom.usecase'
import { ClassRoomProps } from '@/domain/entities/classroom.entity'

describe('Create ClassRoom Use Case', () => {
  let sut: CreateClassRoomUseCase
  let classroomsRepository: InMemoryClassRoomsRepository
  const dummyClassRoom: ClassRoomProps = {
    maxStudentsNumber: 1,
    minAge: 1,
    discipline: 'any_discipline',
    duration: 1,
  }

  beforeEach(() => {
    classroomsRepository = new InMemoryClassRoomsRepository()
    sut = new CreateClassRoomUseCase(classroomsRepository)
  })

  test('Deve criar um ClassRoom', async () => {
    await sut.execute(dummyClassRoom)
    expect(classroomsRepository.data.toArray()[0].id.toString()).toEqual(
      expect.any(String),
    )
    expect(classroomsRepository.data.toArray().length).toBe(1)
    expect(classroomsRepository.data.toArray()[0].maxStudentsNumber).toEqual(
      dummyClassRoom.maxStudentsNumber,
    )
    expect(classroomsRepository.data.toArray()[0].minAge).toEqual(
      dummyClassRoom.minAge,
    )
    expect(classroomsRepository.data.toArray()[0].discipline).toEqual(
      dummyClassRoom.discipline,
    )
    expect(classroomsRepository.data.toArray()[0].duration).toEqual(
      dummyClassRoom.duration,
    )
  })
})
