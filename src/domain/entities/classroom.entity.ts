import { DomainEntity } from '@/core/entities/domain-entity.entity'
import { ClassRoomCode } from './value-objects/classroom-code'

export interface ClassRoomProps {
  maxStudentsNumber: number
  minAge: number
  discipline: string
  duration: number
}

type CreateClassRoomProps = object

export class ClassRoom extends DomainEntity<CreateClassRoomProps> {
  public static create(props: ClassRoomProps): ClassRoom {
    return new ClassRoom(props, ClassRoomCode.create())
  }

  get id(): ClassRoomCode {
    return ClassRoomCode.restore(super.id.toString())
  }
}
