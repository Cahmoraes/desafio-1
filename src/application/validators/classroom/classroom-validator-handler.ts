import { ClassRoomProps } from '@/domain/entities/classroom.entity'

export abstract class ClassroomValidatorHandler {
  constructor(private next?: ClassroomValidatorHandler) {}

  public abstract handle(props: ClassRoomProps): void

  protected handleNext(props: ClassRoomProps): void {
    if (this.next) return this.next.handle(props)
  }
}
