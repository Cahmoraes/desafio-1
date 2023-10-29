import { setTimeout } from 'node:timers/promises'
import { StudentsRepository } from '@/application/repositories/students.repository'
import { Student } from '@/domain/entities/student.entity'
import { FSDatabase } from './fs-database'
import { StudentMapper } from '@/application/mappers/student.mapper'

export class FSStudentsRepository implements StudentsRepository {
  private database: FSDatabase

  constructor(database: FSDatabase) {
    this.database = database
    this.database.createIfNotExists()
  }

  async save(aStudent: Student): Promise<void> {
    await this.database.save(StudentMapper.toDto(aStudent))
  }

  async update(aStudent: Student): Promise<void> {
    const persistedStudent: any = await this.performStudentOfId(
      aStudent.id.toString(),
    )
    if (!persistedStudent) throw new Error('Student not exists')
    await this.performUpdate(aStudent)
  }

  private async retry(
    fn: () => Promise<any>,
    retries = 3,
    milliseconds = 1000,
  ): Promise<any> {
    await setTimeout(retries * milliseconds)
    const persistedStudent = await fn()
    if (persistedStudent) return persistedStudent
    if (--retries > 0) return this.retry(fn, retries)
    return persistedStudent
  }

  private async performUpdate(aStudent: Student): Promise<void> {
    await this.database.update(aStudent.id.toString(), {
      firstName: aStudent.name,
      lastName: aStudent.lastName,
      allergies: aStudent.allergies.map(String),
      birthDay: aStudent.birthDay,
      blood: aStudent.blood,
      classRoom: aStudent.classRoom?.toString(),
      medication: aStudent.medication?.map(String),
      registrationDate: aStudent.registrationDate,
      cpf: aStudent.cpf.toString(),
      parentId: aStudent.parentId?.toString(),
    })
  }

  async delete(aStudent: Student): Promise<void> {
    await this.database.delete(aStudent.id.toString())
  }

  async studentOfId(aStudentId: string): Promise<Student | null> {
    const persistedStudent: any = await this.performStudentOfId(aStudentId)
    if (!persistedStudent) return null
    return Student.restore(persistedStudent, persistedStudent.id)
  }

  private async performStudentOfId(aStudentId: string): Promise<object | null> {
    return this.database.findById(aStudentId)
  }

  async allStudents(page: number): Promise<Student[]> {
    return this.database.getAll(page)
  }
}
