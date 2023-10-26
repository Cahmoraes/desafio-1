import { StudentUseCaseFactory } from '@/application/usecases/students/factories/student-usecase.factory'
import { HandlerParams } from '../../server/handler-params/handler-params'

export class CreateStudentController {
  constructor(private readonly studentUseCaseFactory: StudentUseCaseFactory) {
    this.bindMethod()
  }

  private bindMethod() {
    this.handleRequest = this.handleRequest.bind(this)
  }

  public async handleRequest({ request }: HandlerParams) {
    const createStudentUseCase =
      this.studentUseCaseFactory.createCreateStudentUseCase()
    const body = request.body as any
    return createStudentUseCase.execute(body)
  }
}
