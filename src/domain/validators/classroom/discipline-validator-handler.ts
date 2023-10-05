import { ClassRoomProps } from '@/domain/entities/classroom.entity'
import { ClassroomValidatorHandler } from './classroom-validator-handler'
import { RequiredFieldError } from '@/domain/entities/errors/required-field.error'

export class DisciplineValidatorHandler extends ClassroomValidatorHandler {
  public handle(props: ClassRoomProps): void {
    if (!props.discipline.length) {
      throw new RequiredFieldError('discipline is required')
    }
    this.handleNext(props)
  }
}
