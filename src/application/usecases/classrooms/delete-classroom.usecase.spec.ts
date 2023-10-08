import { InMemoryClassRoomsRepository } from '@/infra/repositories/in-memory/in-memory-classrooms.repository'
import { DeleteClassRoomUseCase } from './delete-classroom.usecase'
import { ClassRoom, ClassRoomProps } from '@/domain/entities/classroom.entity'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'

describe('Delete ClassRoom Use Case', () => {
  let sut: DeleteClassRoomUseCase
  let classroomsRepository: InMemoryClassRoomsRepository
  const dummyClassRoom: ClassRoomProps = {
    maxStudentsNumber: 1,
    minAge: 1,
    discipline: 'any_discipline',
    duration: 1,
  }

  beforeEach(() => {
    classroomsRepository = new InMemoryClassRoomsRepository()
    sut = new DeleteClassRoomUseCase(classroomsRepository)
  })

  test('Deve criar um ClassRoom', async () => {
    const classroom = ClassRoom.create(dummyClassRoom)
    await classroomsRepository.save(classroom)

    await sut.execute({
      classroomId: classroom.id.toString(),
    })

    expect(classroomsRepository.data.size).toBe(0)
  })

  test('Deve gerar um erro ao tentar deletar um ClassRoom não existente', async () => {
    await expect(() =>
      sut.execute({ classroomId: 'any_id' }),
    ).rejects.toThrowError(
      new ResourceNotFoundError('ClassRoom of id [any_id] not found'),
    )
  })
})
