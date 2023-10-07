import { ClassRoomProps } from '@/domain/entities/classroom.entity'
import { ClassroomValidatorHandler } from './classroom-validator-handler'
import { RequiredFieldError } from '@/domain/entities/errors/required-field.error'

export class DurationValidatorHandler extends ClassroomValidatorHandler {
  public handle(props: ClassRoomProps): void {
    if (!props.duration) {
      throw new RequiredFieldError('duration must be greater than zero')
    }
    this.handleNext(props)
  }
}
