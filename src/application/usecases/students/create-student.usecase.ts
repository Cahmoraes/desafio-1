import { BloodType } from '@/core/enums/blood-types.enum'
import { StudentsRepository } from '../../repositories/students.repository'
import { Student } from '@/domain/entities/student.entity'

interface CreateStudentUseCaseInput {
  firstName: string
  lastName: string
  birthDay: Date
  allergies: string[]
  blood: BloodType
  medication: string[]
  registrationDate: Date
  parentId: string
  cpf: string
}

type CreateStudentUseCaseOutput = void

export class CreateStudentUseCase {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  public async execute(
    input: CreateStudentUseCaseInput,
  ): Promise<CreateStudentUseCaseOutput> {
    const student = Student.create(input)
    await this.studentsRepository.save(student)
  }
}
