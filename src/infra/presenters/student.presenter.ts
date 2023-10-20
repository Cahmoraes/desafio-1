import { Student } from '@/domain/entities/student.entity'
import { Presenter } from './presenter'
import { BloodType } from '@/core/enums/blood-types.enum'

export interface StudentPresenterOutput {
  id: string
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

export class StudentPresenter implements Presenter<Student> {
  public present(aStudent: Student): StudentPresenterOutput {
    return {
      id: aStudent.id.toString(),
      firstName: aStudent.name,
      lastName: aStudent.lastName,
      birthDay: aStudent.birthDay,
      allergies: aStudent.allergies.map(String),
      blood: aStudent.blood,
      medication: aStudent.medication.map(String),
      registrationDate: aStudent.registrationDate,
      parentId: aStudent.parentId?.toString(),
      cpf: aStudent.cpf.toString(),
    }
  }
}
