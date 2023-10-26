import { BloodType } from '@/core/enums/blood-types.enum'
import { Student } from '@/domain/entities/student.entity'

export interface StudentDTO {
  id: string
  firstName: string
  lastName: string
  birthDay: Date
  allergies: string[]
  blood: BloodType
  medication: string[]
  registrationDate: Date
  parentId?: string
  classRoomCode?: string
  cpf: string
}

export class StudentMapper {
  public static toDto(aStudent: Student): StudentDTO {
    return {
      id: aStudent.id.toString(),
      firstName: aStudent.name,
      lastName: aStudent.lastName,
      birthDay: aStudent.birthDay,
      allergies: aStudent.allergies.map(String),
      blood: aStudent.blood,
      medication: aStudent.medication.map(String),
      registrationDate: aStudent.registrationDate,
      parentId: aStudent.parentId,
      classRoomCode: aStudent.classRoom?.toString(),
      cpf: aStudent.cpf.toString(),
    }
  }
}
