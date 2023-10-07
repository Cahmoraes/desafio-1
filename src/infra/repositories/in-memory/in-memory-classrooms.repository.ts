import { ClassRoomsRepository } from '@/application/repositories/classrooms.repository'
import { ClassRoom } from '@/domain/entities/classroom.entity'
import ExtendedSet from '@cahmoraes93/extended-set'

export class InMemoryClassRoomsRepository implements ClassRoomsRepository {
  public LIMIT_PER_PAGE = 20
  public data = new ExtendedSet<ClassRoom>()

  async save(aClassRoom: ClassRoom): Promise<void> {
    this.data.add(aClassRoom)
  }

  async update(aClassRoom: ClassRoom): Promise<void> {
    const classroomToDelete = this.data.find((classroom) =>
      classroom.id.equals(aClassRoom.id),
    )
    if (classroomToDelete) this.data.delete(classroomToDelete)
    this.data.add(aClassRoom)
  }

  async classroomOfId(aClassRoomId: string): Promise<ClassRoom | null> {
    return this.data.find(
      (classroom) => classroom.id.toString() === aClassRoomId,
    )
  }

  async delete(aClassRoom: ClassRoom): Promise<void> {
    this.data.delete(aClassRoom)
  }

  async allClassRooms(page: number): Promise<ClassRoom[]> {
    return this.data
      .toArray()
      .slice((page - 1) * this.LIMIT_PER_PAGE, page * this.LIMIT_PER_PAGE)
  }
}
