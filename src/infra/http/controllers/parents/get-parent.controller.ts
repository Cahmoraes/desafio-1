import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { HandlerParams } from '../../server/handler-params/handler-params'

export class GetParentController {
  constructor(private readonly parentUseCaseFactory: ParentUseCaseFactory) {
    this.bindMethod()
  }

  private bindMethod() {
    this.handleRequest = this.handleRequest.bind(this)
  }

  public async handleRequest({ request }: HandlerParams) {
    console.log('handleRequest')
    const createParentUseCase =
      this.parentUseCaseFactory.createGetParentUseCase()
    const params = request.params as any
    return await createParentUseCase.execute({
      parentId: params.parentId,
    })
  }
}
