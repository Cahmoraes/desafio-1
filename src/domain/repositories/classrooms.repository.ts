import { ClassRoom } from '../entities/classroom.entity'

export interface ClassRoomsRepository {
  save(aClassRoom: ClassRoom): Promise<void>
  update(aClassRoom: ClassRoom): Promise<void>
  delete(aClassRoom: ClassRoom): Promise<void>
  classroomOfId(aClassRoomId: string): Promise<ClassRoom | null>
  allClassRooms(page: number): Promise<ClassRoom[]>
}
