import { Student, StudentProps } from './student.entity'
import { Cpf } from './value-objects/cpf'
import { Name } from './value-objects/name'

describe('Student Entity', () => {
  const dummyStudent: StudentProps = {
    firstName: 'any_name',
    lastName: 'any_sobrenome',
    allergies: ['any_allergy'],
    blood: 'any_blood',
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
    expect(student.allergies).toEqual(dummyStudent.allergies)
    expect(student.blood).toEqual(dummyStudent.blood)
    expect(student.medication).toEqual(dummyStudent.medication)
    expect(student.registrationDate).toEqual(dummyStudent.registrationDate)
    expect(student.cpf).toEqual(Cpf.create(dummyStudent.cpf).toString())
  })
})
