import { InMemoryClassRoomsRepository } from '@/infra/repositories/in-memory/in-memory-classrooms.repository'
import { GetClassRoomUseCase } from './get-classrooms.usecase'
import { ClassRoom, ClassRoomProps } from '@/domain/entities/classroom.entity'

describe('Get ClassRoom Use Case', async () => {
  let sut: GetClassRoomUseCase
  let classroomsRepository: InMemoryClassRoomsRepository
  const dummyClassRoom: ClassRoomProps = {
    maxStudentsNumber: 1,
    minAge: 1,
    discipline: 'any_discipline',
    duration: 1,
  }

  beforeEach(() => {
    classroomsRepository = new InMemoryClassRoomsRepository()
    sut = new GetClassRoomUseCase(classroomsRepository)
  })

  test('Deve listar ClassRooms', async () => {
    for (let i = 0; i < 20; i++) {
      classroomsRepository.save(ClassRoom.create(dummyClassRoom))
    }
    classroomsRepository.save(
      ClassRoom.create(dummyClassRoom, {
        number: 23,
        char: 'C',
        turn: 'M',
      }),
    )

    const { classroom } = await sut.execute({
      classroomId: '23C-M',
    })

    expect(classroom.id.toString()).toBe('23C-M')
  })

  test('Deve gerar um erro ao tentar deletar um ClassRoom não existente', async () => {
    await expect(() =>
      sut.execute({ classroomId: 'any_id' }),
    ).rejects.toThrowError('ClassRoom of id [any_id] not found')
  })
})
