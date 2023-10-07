import ExtendedSet from '@cahmoraes93/extended-set'
import { Student } from '@/domain/entities/student.entity'
import { StudentsRepository } from '@/application/repositories/students.repository'

export class InMemoryStudentsRepository implements StudentsRepository {
  public LIMIT_PER_PAGE = 20
  public data = new ExtendedSet<Student>()

  async save(aStudent: Student): Promise<void> {
    this.data.add(aStudent)
  }

  async update(aStudent: Student): Promise<void> {
    const studentToDelete = this.data.find((student) =>
      student.id.equals(aStudent.id),
    )
    if (studentToDelete) this.data.delete(studentToDelete)
    this.data.add(aStudent)
  }

  async studentOfId(aStudentId: string): Promise<Student | null> {
    return this.data.find((student) => student.id.toString() === aStudentId)
  }

  async delete(aStudent: Student): Promise<void> {
    this.data.delete(aStudent)
  }

  async allStudents(page: number): Promise<Student[]> {
    return this.data
      .toArray()
      .slice((page - 1) * this.LIMIT_PER_PAGE, page * this.LIMIT_PER_PAGE)
  }
}
