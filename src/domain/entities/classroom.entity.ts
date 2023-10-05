import { DomainEntity } from '@/core/entities/domain-entity.entity'
import { ClassRoomCode } from './value-objects/classroom-code'
import { RequiredFieldError } from './errors/required-field.error'

export interface ClassRoomProps {
  maxStudentsNumber: number
  minAge: number
  discipline: string
  duration: number
}

export class ClassRoom extends DomainEntity<ClassRoomProps> {
  public static create(props: ClassRoomProps): ClassRoom {
    this.validate(props)
    return new ClassRoom(props, ClassRoomCode.create())
  }

  private static validate(props: ClassRoomProps): void {
    if (!props.discipline.length) {
      throw new RequiredFieldError('discipline is required')
    }
    if (!props.duration) {
      throw new RequiredFieldError('duration must be greater than zero')
    }
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
}
