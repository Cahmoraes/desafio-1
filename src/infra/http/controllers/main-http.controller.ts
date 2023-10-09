import { FastifyReply, FastifyRequest } from 'fastify'
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
      async (req: FastifyRequest, res: FastifyReply): Promise<object> => {
        const createParentUseCase =
          this.parentUseCaseFactory.createCreateParentUseCase()
        const body = req.body as any
        await createParentUseCase.execute(body)
      },
    )
  }
}
