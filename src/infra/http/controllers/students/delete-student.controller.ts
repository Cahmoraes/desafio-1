import { StudentUseCaseFactory } from '@/application/usecases/students/factories/student-usecase.factory'
import { HandlerParams } from '../../server/handler-params/handler-params'

export class DeleteStudentController {
  constructor(private readonly studentUseCaseFactory: StudentUseCaseFactory) {
    this.bindMethod()
  }

  private bindMethod() {
    this.handleRequest = this.handleRequest.bind(this)
  }

  public async handleRequest({ request }: HandlerParams) {
    const deleteStudentUseCase =
      this.studentUseCaseFactory.createDeleteStudentUseCase()
    const params = request.params as any
    await deleteStudentUseCase.execute({
      studentId: params.studentId,
    })
  }
}
