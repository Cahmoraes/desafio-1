import { StudentUseCaseFactory } from '@/application/usecases/students/factories/student-usecase.factory'
import { HandlerParams } from '../../server/handler-params/handler-params'

export class UpdateStudentController {
  constructor(private readonly studentUseCaseFactory: StudentUseCaseFactory) {
    this.bindMethod()
  }

  private bindMethod() {
    this.handleRequest = this.handleRequest.bind(this)
  }

  public async handleRequest({ request }: HandlerParams): Promise<void> {
    const updateUseCase =
      this.studentUseCaseFactory.createUpdateStudentUseCase()
    const body = request.body as any
    const params = request.params as any
    await updateUseCase.execute({
      studentId: params.studentId,
      fields: body,
    })
  }
}
