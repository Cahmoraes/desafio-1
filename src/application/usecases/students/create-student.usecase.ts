import { BloodType } from '@/core/enums/blood-types.enum'
import { StudentsRepository } from '../../repositories/students.repository'
import { Student } from '@/domain/entities/student.entity'
import { Presenter } from '@/infra/presenters/presenter'

interface CreateStudentUseCaseInput {
  firstName: string
  lastName: string
  birthDay: Date
  allergies: string[]
  blood: BloodType
  medication: string[]
  registrationDate: Date
  parentId?: string
  cpf: string
}

type CreateStudentUseCaseOutput = object

export class CreateStudentUseCase {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly studentPresenter: Presenter<Student>,
  ) {}

  public async execute(
    input: CreateStudentUseCaseInput,
  ): Promise<CreateStudentUseCaseOutput> {
    const student = Student.create(input)
    await this.studentsRepository.save(student)
    return this.studentPresenter.present(student)
  }
}
