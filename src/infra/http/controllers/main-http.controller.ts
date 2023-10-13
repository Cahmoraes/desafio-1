import { HTTPMethodTypes, HttpServer } from '../server/http-server'
import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { CreateParentController } from './parents/create-parent.controller'
import { GetParentController } from './parents/get-parent.controller'
import { ParentsRoutes } from './parents/parents-routes.enum'
import { DeleteParentController } from './parents/delete-parent.controller'
import { UpdateParentController } from './parents/update-parent.controller'

export class MainHttpController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly parentUseCaseFactory: ParentUseCaseFactory,
  ) {}

  public async init(): Promise<void> {
    await this.registerCreateParentController()
    await this.registerGetParentController()
    await this.registerDeleteParentController()
    await this.registerUpdateParentController()
  }

  private async registerCreateParentController(): Promise<void> {
    await this.httpServer.on(
      HTTPMethodTypes.POST,
      ParentsRoutes.CREATE,
      new CreateParentController(this.parentUseCaseFactory).handleRequest,
    )
  }

  private async registerGetParentController(): Promise<void> {
    await this.httpServer.on(
      HTTPMethodTypes.GET,
      ParentsRoutes.GET,
      new GetParentController(this.parentUseCaseFactory).handleRequest,
    )
  }

  private async registerDeleteParentController(): Promise<void> {
    await this.httpServer.on(
      HTTPMethodTypes.DELETE,
      ParentsRoutes.DELETE,
      new DeleteParentController(this.parentUseCaseFactory).handleRequest,
    )
  }

  private async registerUpdateParentController(): Promise<void> {
    await this.httpServer.on(
      HTTPMethodTypes.PUT,
      ParentsRoutes.PUT,
      new UpdateParentController(this.parentUseCaseFactory).handleRequest,
    )
  }
}
