import { HTTPMethodTypes, HttpServer } from '../server/http-server'
import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { CreateParentController } from './parents/create-parent.controller'
import { GetParentController } from './parents/get-parent.controller'
import { ParentsRoutes } from './parents/parents-routes.enum'

export class MainHttpController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly parentUseCaseFactory: ParentUseCaseFactory,
  ) {}

  public async init(): Promise<void> {
    this.registerCreateParentController()
    this.registerGetParentController()
  }

  private registerCreateParentController() {
    this.httpServer.on(
      HTTPMethodTypes.POST,
      ParentsRoutes.CREATE,
      new CreateParentController(this.parentUseCaseFactory).handleRequest,
    )
  }

  private registerGetParentController() {
    this.httpServer.on(
      HTTPMethodTypes.GET,
      ParentsRoutes.GET,
      new GetParentController(this.parentUseCaseFactory).handleRequest,
    )
  }
}
