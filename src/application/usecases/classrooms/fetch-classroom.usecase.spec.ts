import { InMemoryClassRoomsRepository } from '@/infra/repositories/in-memory/in-memory-classrooms.repository'
import { FetchClassRoomsUseCase } from './fetch-classroom.usecase'
import { ClassRoom, ClassRoomProps } from '@/domain/entities/classroom.entity'

describe('Fetch ClassRooms Use Case', async () => {
  let sut: FetchClassRoomsUseCase
  let classroomsRepository: InMemoryClassRoomsRepository
  const dummyClassRoom: ClassRoomProps = {
    maxStudentsNumber: 1,
    minAge: 1,
    discipline: 'any_discipline',
    duration: 1,
  }

  beforeEach(() => {
    classroomsRepository = new InMemoryClassRoomsRepository()
    sut = new FetchClassRoomsUseCase(classroomsRepository)
  })

  test('Deve listar ClassRooms', async () => {
    for (let i = 0; i < 22; i++) {
      const classroom = ClassRoom.create(dummyClassRoom)
      classroomsRepository.save(classroom)
    }

    const { classrooms } = await sut.execute({
      page: 2,
    })

    expect(classrooms).toHaveLength(2)
    expect(classrooms[0].id.toString()).toEqual(expect.any(String))
    expect(classrooms[1].id.toString()).toEqual(expect.any(String))
  })
})
