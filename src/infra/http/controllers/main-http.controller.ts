import { HTTPMethodTypes, HttpServer } from '../server/http-server'
import { ParentUseCaseFactory } from '../../../application/usecases/parents/factories/parent-usecase.factory'

export class MainHttpController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly parentUseCaseFactory: ParentUseCaseFactory,
  ) {}

  public async init(): Promise<void> {
    this.httpServer.on(
      HTTPMethodTypes.GET,
      '/parents',
      async (req, res): Promise<void> => {
        const createParentUseCase = this.parentUseCaseFactory
          .createCreateParentUseCaseFactory()
          .create()
        const body = req.body
        await createParentUseCase.execute(body)
        Promise.resolve()
      },
    )
  }
}
