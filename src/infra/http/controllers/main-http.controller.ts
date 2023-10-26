import { HttpServer } from '../server/http-server'
import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { ParentsController } from './parents.controller'
import { StudentsController } from './students.controller'
import { StudentUseCaseFactory } from '@/application/usecases/students/factories/student-usecase.factory'

export class MainHttpController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly parentUseCaseFactory: ParentUseCaseFactory,
    private readonly studentUseCaseFactory: StudentUseCaseFactory,
  ) {}

  public init(): void {
    this.registerParentsController()
    this.registerStudentsController()
  }

  private registerParentsController(): void {
    new ParentsController(this.httpServer, this.parentUseCaseFactory).init()
  }

  private registerStudentsController(): void {
    new StudentsController(this.httpServer, this.studentUseCaseFactory).init()
  }
}
