import { DomainEntity } from '@/core/entities/domain-entity.entity'
import {
  ClassRoomCode,
  ClassRoomCodeProps,
} from './value-objects/classroom-code'
import { Prototype } from './interfaces/prototype'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity'
import { ClassRoomValidatorFactory } from '@/application/validators/classroom/class-validator-factory'

export interface ClassRoomProps {
  maxStudentsNumber: number
  minAge: number
  discipline: string
  duration: number
}

export class ClassRoom
  extends DomainEntity<ClassRoomProps>
  implements Prototype<ClassRoom>
{
  private readonly _studentsIds: string[] = []

  public static create(
    props: ClassRoomProps,
    anIdOrClassRoomCodeProps?: UniqueEntityId | ClassRoomCodeProps,
  ): ClassRoom {
    this.validate(props)
    return new ClassRoom(props, ClassRoomCode.create(anIdOrClassRoomCodeProps))
  }

  private static validate(props: ClassRoomProps): void {
    ClassRoomValidatorFactory.create().handle(props)
  }

  public clone(fields?: Partial<ClassRoomProps>): ClassRoom {
    return ClassRoom.create(
      {
        discipline: this.discipline,
        duration: this.duration,
        maxStudentsNumber: this.maxStudentsNumber,
        minAge: this.minAge,
        ...fields,
      },
      this.id,
    )
  }

  get id(): ClassRoomCode {
    return ClassRoomCode.restore(super.id.toString())
  }

  get maxStudentsNumber(): number {
    return this.props.maxStudentsNumber
  }

  get minAge(): number {
    return this.props.minAge
  }

  get discipline(): string {
    return this.props.discipline
  }

  get duration(): number {
    return this.props.duration
  }

  get studentsIds(): string[] {
    return this._studentsIds
  }

  public addStudent(aStudentId: string) {
    this._studentsIds.push(aStudentId)
  }
}
