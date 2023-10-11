import { HandlerParams } from '../server/handler-params/handler-params'
import { HTTPMethodTypes, HttpServer } from '../server/http-server'
import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'

export class MainHttpController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly parentUseCaseFactory: ParentUseCaseFactory,
  ) {}

  public async init(): Promise<void> {
    console.log('init')
    this.httpServer.on(
      HTTPMethodTypes.POST,
      '/parents',
      async ({ request }: HandlerParams): Promise<unknown> => {
        const createParentUseCase =
          this.parentUseCaseFactory.createCreateParentUseCase()
        const body = request.body as any
        return await createParentUseCase.execute(body)
      },
    )
  }
}
