import { Student, StudentProps } from './student.entity'
import { Allergy } from './value-objects/allergy'
import { Cpf } from './value-objects/cpf'
import { Name } from './value-objects/name'

describe('Student Entity', () => {
  const dummyStudent: StudentProps = {
    firstName: 'any_name',
    lastName: 'any_sobrenome',
    allergies: ['any_allergy'],
    blood: 'A+',
    birthDay: new Date(),
    medication: ['any_medication'],
    parentId: 'any_parent-id',
    registrationDate: new Date(),
    cpf: 'any_cpf',
  }

  test('Deve criar um Student', () => {
    const student = Student.create(dummyStudent)
    expect(student).toBeInstanceOf(Student)
    expect(student.fullName).toEqual(
      Name.create(dummyStudent.firstName, dummyStudent.lastName).fullName,
    )
    expect(student.allergies).toBeInstanceOf(Array)
    expect(student.allergies[0].toString()).toEqual(
      Allergy.create(dummyStudent.allergies[0]).toString(),
    )
    expect(student.blood).toEqual(dummyStudent.blood)
    expect(student.medication).toEqual(dummyStudent.medication)
    expect(student.registrationDate).toEqual(dummyStudent.registrationDate)
    expect(student.cpf).toEqual(Cpf.create(dummyStudent.cpf).toString())
    expect(student.parentId).toEqual(dummyStudent.parentId)
    expect(student.birthDay).toEqual(dummyStudent.birthDay)
  })
})
