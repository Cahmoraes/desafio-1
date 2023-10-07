import ExtendedSet from '@cahmoraes93/extended-set'
import { Teacher } from '@/domain/entities/teacher.entity'
import { TeachersRepository } from '@/application/repositories/teachers.repository'

export class InMemoryTeachersRepository implements TeachersRepository {
  public LIMIT_PER_PAGE = 20
  public data = new ExtendedSet<Teacher>()

  async save(aTeacher: Teacher): Promise<void> {
    this.data.add(aTeacher)
  }

  async update(aTeacher: Teacher): Promise<void> {
    const teacherToDelete = this.data.find((teacher) =>
      teacher.id.equals(aTeacher.id),
    )
    if (teacherToDelete) this.data.delete(teacherToDelete)
    this.data.add(aTeacher)
  }

  async teacherOfId(aTeacherId: string): Promise<Teacher | null> {
    return this.data.find((teacher) => teacher.id.toString() === aTeacherId)
  }

  async delete(aTeacher: Teacher): Promise<void> {
    this.data.delete(aTeacher)
  }

  async allTeachers(page: number): Promise<Teacher[]> {
    return this.data
      .toArray()
      .slice((page - 1) * this.LIMIT_PER_PAGE, page * this.LIMIT_PER_PAGE)
  }
}
