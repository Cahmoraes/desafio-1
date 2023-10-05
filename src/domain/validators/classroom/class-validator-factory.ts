import { ClassroomValidatorHandler } from './classroom-validator-handler'
import { DisciplineValidatorHandler } from './discipline-validator-handler'
import { DurationValidatorHandler } from './duration-validator-handler copy'

export class ClassRoomValidatorFactory {
  public static create(): ClassroomValidatorHandler {
    const durationValidator = new DurationValidatorHandler()
    return new DisciplineValidatorHandler(durationValidator)
  }
}
