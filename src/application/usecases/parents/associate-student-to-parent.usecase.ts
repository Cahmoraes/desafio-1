import { ParentsRepository } from '../../repositories/parents.repository'
import { StudentsRepository } from '@/application/repositories/students.repository'

interface AssociateStudentToParentUseCaseInput {
  studentId: string
  parentId: string
}

type AssociateStudentToParentUseCaseOutput = void

export class AssociateStudentToParentUseCase {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly parentsRepository: ParentsRepository,
  ) {}

  public async execute({
    studentId,
    parentId,
  }: AssociateStudentToParentUseCaseInput): Promise<AssociateStudentToParentUseCaseOutput> {
    const student = await this.studentsRepository.studentOfId(studentId)
    if (!student) throw new Error(`Student of id [${studentId}] not found`)
    const parent = await this.parentsRepository.parentOfId(parentId)
    if (!parent) throw new Error(`Parent of id [${parentId}] not found`)
    student.associateToParentId(parentId)
    parent.addStudent(studentId)
    await this.studentsRepository.update(student)
    await this.parentsRepository.update(parent)
  }
}
