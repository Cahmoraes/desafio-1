import { StudentUseCaseFactory } from '@/application/usecases/students/factories/student-usecase.factory'
import { HTTPMethodTypes, HttpServer } from '../server/http-server'
import { StudentsRoutes } from './students/students-routes.enum'
import { CreateStudentController } from './students/create-student.controller'

export class StudentsController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly studentUseCaseFactory: StudentUseCaseFactory,
  ) {}

  public init(): void {
    this.registerCreateStudentController()
  }

  private registerCreateStudentController(): void {
    this.httpServer.on(
      HTTPMethodTypes.POST,
      StudentsRoutes.CREATE,
      new CreateStudentController(this.studentUseCaseFactory).handleRequest,
    )
  }
}
