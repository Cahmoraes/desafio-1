import { InMemoryClassRoomsRepository } from '@/infra/repositories/in-memory/in-memory-classrooms.repository'
import { UpdateClassRoomUseCase } from './update-classrooms.usecase'
import { ClassRoom, ClassRoomProps } from '@/domain/entities/classroom.entity'

describe('Update ClassRoom Use Case', () => {
  let sut: UpdateClassRoomUseCase
  let classroomsRepository: InMemoryClassRoomsRepository
  const dummyClassRoom: ClassRoomProps = {
    maxStudentsNumber: 1,
    minAge: 1,
    discipline: 'any_discipline',
    duration: 1,
  }

  beforeEach(() => {
    classroomsRepository = new InMemoryClassRoomsRepository()
    sut = new UpdateClassRoomUseCase(classroomsRepository)
  })

  test('Deve criar um ClassRoom', async () => {
    const classroom = ClassRoom.create(dummyClassRoom)
    await classroomsRepository.save(classroom)

    await sut.execute({
      classroomId: classroom.id.toString(),
      fields: {
        duration: 4,
        maxStudentsNumber: 6,
      },
    })

    const repositoryData = classroomsRepository.data.toArray()
    expect(repositoryData.length).toBe(1)
    expect(repositoryData[0].id.equals(classroom.id)).toBeTruthy()
    expect(repositoryData[0].duration).toBe(4)
    expect(repositoryData[0].maxStudentsNumber).toEqual(6)
  })

  test('Deve gerar um erro ao tentar atualizar um ClassRoom inexistente', async () => {
    await expect(() =>
      sut.execute({ classroomId: 'inexistent_id', fields: {} }),
    ).rejects.toThrowError('ClassRoom of id [inexistent_id] not found')
  })
})
