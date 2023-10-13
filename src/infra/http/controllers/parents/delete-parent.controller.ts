import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { HandlerParams } from '../../server/handler-params/handler-params'

export class DeleteParentController {
  constructor(private readonly parentUseCaseFactory: ParentUseCaseFactory) {
    this.bindMethod()
  }

  private bindMethod() {
    this.handleRequest = this.handleRequest.bind(this)
  }

  public async handleRequest({ request }: HandlerParams) {
    const createParentUseCase =
      this.parentUseCaseFactory.createDeleteParentUseCase()
    const params = request.params as any
    await createParentUseCase.execute({
      parentId: params.parentId,
    })
  }
}
