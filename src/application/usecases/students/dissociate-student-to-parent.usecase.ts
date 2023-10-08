import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'
import { ParentsRepository } from '../../repositories/parents.repository'
import { StudentsRepository } from '@/application/repositories/students.repository'

interface DissociateStudentToParentUseCaseInput {
  studentId: string
  parentId: string
}

type DissociateStudentToParentUseCaseOutput = void

export class DissociateStudentToParentUseCase {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly parentsRepository: ParentsRepository,
  ) {}

  public async execute({
    studentId,
    parentId,
  }: DissociateStudentToParentUseCaseInput): Promise<DissociateStudentToParentUseCaseOutput> {
    const student = await this.studentsRepository.studentOfId(studentId)
    if (!student) {
      throw new ResourceNotFoundError(`Student of id [${studentId}] not found`)
    }
    const parent = await this.parentsRepository.parentOfId(parentId)
    if (!parent) {
      throw new ResourceNotFoundError(`Parent of id [${parentId}] not found`)
    }
    student.dissociateToParentId()
    parent.removeStudent(studentId)
    await this.studentsRepository.update(student)
    await this.parentsRepository.update(parent)
  }
}
