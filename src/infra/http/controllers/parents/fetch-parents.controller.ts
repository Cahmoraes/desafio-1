import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { HandlerParams } from '../../server/handler-params/handler-params'

export class FetchParentsController {
  constructor(private readonly parentUseCaseFactory: ParentUseCaseFactory) {
    this.bindMethod()
  }

  private bindMethod(): void {
    this.handleRequest = this.handleRequest.bind(this)
  }

  public async handleRequest({ request }: HandlerParams) {
    const fetchParentsUseCase =
      this.parentUseCaseFactory.createFetchParentsUseCase()
    const query = request.query as any
    return fetchParentsUseCase.execute({
      page: query.page,
    })
  }
}
