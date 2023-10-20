import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { HandlerParams } from '../../server/handler-params/handler-params'

export class CreateParentController {
  constructor(private readonly parentUseCaseFactory: ParentUseCaseFactory) {
    this.bindMethod()
  }

  private bindMethod() {
    this.handleRequest = this.handleRequest.bind(this)
  }

  public async handleRequest({ request }: HandlerParams) {
    const createParentUseCase =
      this.parentUseCaseFactory.createCreateParentUseCase()
    const body = request.body as any
    return createParentUseCase.execute(body)
  }
}
