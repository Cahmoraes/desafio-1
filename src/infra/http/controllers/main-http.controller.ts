import { HttpServer } from '../server/http-server'
import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { ParentsController } from './parents.controller'

export class MainHttpController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly parentUseCaseFactory: ParentUseCaseFactory,
  ) {}

  public init(): void {
    this.registerParentsController()
  }

  private registerParentsController(): void {
    new ParentsController(this.httpServer, this.parentUseCaseFactory).init()
  }
}
