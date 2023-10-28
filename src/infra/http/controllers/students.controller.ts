import { StudentUseCaseFactory } from '@/application/usecases/students/factories/student-usecase.factory'
import { HTTPMethodTypes, HttpServer } from '../server/http-server'
import { StudentsRoutes } from './students/students-routes.enum'
import { CreateStudentController } from './students/create-student.controller'
import { DeleteStudentController } from './students/delete-student.controller'
import { UpdateStudentController } from './students/update-student.controller'

export class StudentsController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly studentUseCaseFactory: StudentUseCaseFactory,
  ) {}

  public init(): void {
    this.registerCreateStudentController()
    this.registerDeleteStudentController()
    this.registerUpdateStudentController()
  }

  private registerCreateStudentController(): void {
    this.httpServer.on(
      HTTPMethodTypes.POST,
      StudentsRoutes.CREATE,
      new CreateStudentController(this.studentUseCaseFactory).handleRequest,
    )
  }

  private registerDeleteStudentController(): void {
    this.httpServer.on(
      HTTPMethodTypes.DELETE,
      StudentsRoutes.DELETE,
      new DeleteStudentController(this.studentUseCaseFactory).handleRequest,
    )
  }

  private registerUpdateStudentController(): void {
    this.httpServer.on(
      HTTPMethodTypes.PUT,
      StudentsRoutes.PUT,
      new UpdateStudentController(this.studentUseCaseFactory).handleRequest,
    )
  }
}
