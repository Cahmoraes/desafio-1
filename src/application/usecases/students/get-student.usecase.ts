import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'
import { StudentsRepository } from '@/application/repositories/students.repository'
import { Student } from '@/domain/entities/student.entity'
import { Presenter } from '@/infra/presenters/presenter'

interface GetStudentUseCaseInput {
  studentId: string
}

type GetStudentUseCaseOutput = object

export class GetStudentUseCase {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly studentPresenter: Presenter<Student>,
  ) {}

  public async execute({
    studentId,
  }: GetStudentUseCaseInput): Promise<GetStudentUseCaseOutput> {
    const student = await this.studentsRepository.studentOfId(studentId)
    if (!student) {
      throw new ResourceNotFoundError(`Student of id [${studentId}] not found`)
    }
    return this.studentPresenter.present(student)
  }
}
