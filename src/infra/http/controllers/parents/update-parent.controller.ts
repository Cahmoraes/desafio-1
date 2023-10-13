import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { HandlerParams } from '../../server/handler-params/handler-params'

export class UpdateParentController {
  constructor(private readonly parentUseCaseFactory: ParentUseCaseFactory) {
    this.bindMethod()
  }

  private bindMethod() {
    this.handleRequest = this.handleRequest.bind(this)
  }

  public async handleRequest({ request }: HandlerParams): Promise<void> {
    const updateUseCase = this.parentUseCaseFactory.createUpdateParentUseCase()
    const body = request.body as any
    const params = request.params as any
    await updateUseCase.execute({
      parentId: params.parentId,
      fields: body,
    })
  }
}
