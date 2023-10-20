import { StudentsRepository } from '@/application/repositories/students.repository'
import { Presenter } from '@/infra/presenters/presenter'
import { Student } from '@/domain/entities/student.entity'
import { CreateStudentUseCase } from '../create-student.usecase'
import { DeleteStudentUseCase } from '../delete-student.usecase'
import { UpdateStudentUseCase } from '../update-student.usecase'
import { GetStudentUseCase } from '../get-student.usecase'
import { FetchStudentsUseCase } from '../fetch-students.usecase'

export class StudentUseCaseFactory {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly studentPresenter: Presenter<Student>,
  ) {}

  public createCreateStudentUseCase(): CreateStudentUseCase {
    return new CreateStudentUseCase(
      this.studentsRepository,
      this.studentPresenter,
    )
  }

  public createDeleteStudentUseCase(): DeleteStudentUseCase {
    return new DeleteStudentUseCase(this.studentsRepository)
  }

  public createFetchStudentsUseCase(): FetchStudentsUseCase {
    return new FetchStudentsUseCase(this.studentsRepository)
  }

  public createGetStudentUseCase(): GetStudentUseCase {
    return new GetStudentUseCase(this.studentsRepository, this.studentPresenter)
  }

  public createUpdateStudentUseCase(): UpdateStudentUseCase {
    return new UpdateStudentUseCase(this.studentsRepository)
  }
}
