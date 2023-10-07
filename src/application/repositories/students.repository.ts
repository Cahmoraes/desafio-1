import { Student } from '@/domain/entities/student.entity'

export interface StudentsRepository {
  save(aStudent: Student): Promise<void>
  update(aStudent: Student): Promise<void>
  delete(aStudent: Student): Promise<void>
  studentOfId(aStudentId: string): Promise<Student | null>
  allStudents(page: number): Promise<Student[]>
}
