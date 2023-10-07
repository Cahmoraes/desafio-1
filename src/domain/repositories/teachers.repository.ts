import { Teacher } from '../entities/teacher.entity'

export interface TeachersRepository {
  save(aTeacher: Teacher): Promise<void>
  update(aTeacher: Teacher): Promise<void>
  delete(aTeacher: Teacher): Promise<void>
  teacherOfId(aTeacherId: string): Promise<Teacher | null>
  allTeachers(page: number): Promise<Teacher[]>
}
