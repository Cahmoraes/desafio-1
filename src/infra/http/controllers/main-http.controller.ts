import { HTTPMethodTypes, HttpServer } from '../server/http-server'
import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { CreateParentController } from './parents/create-parent.controller'
import { GetParentController } from './parents/get-parent.controller'
import { ParentsRoutes } from './parents/parents-routes.enum'
import { DeleteParentController } from './parents/delete-parent.controller'
import { UpdateParentController } from './parents/update-parent.controller'
import { FetchParentsController } from './parents/fetch-parents.controller'

export class MainHttpController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly parentUseCaseFactory: ParentUseCaseFactory,
  ) {}

  public init(): void {
    this.registerCreateParentController()
    this.registerGetParentController()
    this.registerDeleteParentController()
    this.registerUpdateParentController()
    this.registerFetchParentsController()
  }

  private registerCreateParentController(): void {
    this.httpServer.on(
      HTTPMethodTypes.POST,
      ParentsRoutes.CREATE,
      new CreateParentController(this.parentUseCaseFactory).handleRequest,
    )
  }

  private registerGetParentController(): void {
    this.httpServer.on(
      HTTPMethodTypes.GET,
      ParentsRoutes.GET,
      new GetParentController(this.parentUseCaseFactory).handleRequest,
    )
  }

  private registerDeleteParentController(): void {
    this.httpServer.on(
      HTTPMethodTypes.DELETE,
      ParentsRoutes.DELETE,
      new DeleteParentController(this.parentUseCaseFactory).handleRequest,
    )
  }

  private registerUpdateParentController(): void {
    this.httpServer.on(
      HTTPMethodTypes.PUT,
      ParentsRoutes.PUT,
      new UpdateParentController(this.parentUseCaseFactory).handleRequest,
    )
  }

  private registerFetchParentsController(): void {
    this.httpServer.on(
      HTTPMethodTypes.GET,
      ParentsRoutes.FETCH,
      new FetchParentsController(this.parentUseCaseFactory).handleRequest,
    )
  }
}
