import { RequiredFieldError } from './errors/required-field.error'
import { Student, StudentProps } from './student.entity'
import { Allergy } from './value-objects/allergy'
import { Cpf } from './value-objects/cpf'
import { Medication } from './value-objects/medication'
import { Name } from './value-objects/name'

describe('Student Entity', () => {
  const dummyStudent: StudentProps = {
    firstName: 'any_name',
    lastName: 'any_sobrenome',
    allergies: ['any_allergy'],
    blood: 'A+',
    birthDay: new Date(),
    medication: ['any_medication'],
    registrationDate: new Date(),
    cpf: 'any_cpf',
  }
  const dummyParentId = 'any_parent-id'

  test('Deve criar um Student', () => {
    const student = Student.create(dummyStudent)
    student.addParent(dummyParentId)
    expect(student).toBeInstanceOf(Student)
    expect(student.fullName).toEqual(
      Name.create(dummyStudent.firstName, dummyStudent.lastName).fullName,
    )
    expect(student.allergies).toBeInstanceOf(Array)
    expect(student.allergies[0].toString()).toEqual(
      Allergy.create(dummyStudent.allergies[0]).toString(),
    )
    expect(student.blood).toEqual(dummyStudent.blood)
    expect(student.medication).toBeInstanceOf(Array)
    expect(student.medication[0].toString()).toEqual(
      Medication.create(dummyStudent.medication[0]).toString(),
    )
    expect(student.registrationDate).toEqual(dummyStudent.registrationDate)
    expect(student.cpf).toEqual(Cpf.create(dummyStudent.cpf).toString())
    expect(student.parentsId).toEqual([dummyParentId])
    expect(student.birthDay).toEqual(dummyStudent.birthDay)
  })

  test('Deve gerar um erro ao criar um Student sem nome', () => {
    const cloneDummyStudent: StudentProps = {
      ...dummyStudent,
      firstName: '',
    }
    expect(() => Student.create(cloneDummyStudent)).toThrow(
      new RequiredFieldError('firstName is required'),
    )
  })

  test('Deve gerar um erro ao criar um Student sem sobrenome', () => {
    const cloneDummyStudent: StudentProps = {
      ...dummyStudent,
      lastName: '',
    }
    expect(() => Student.create(cloneDummyStudent)).toThrow(
      new RequiredFieldError('lastName is required'),
    )
  })

  test('Deve gerar um erro ao criar um Student sem cpf', () => {
    const cloneDummyStudent: StudentProps = {
      ...dummyStudent,
      cpf: '',
    }
    expect(() => Student.create(cloneDummyStudent)).toThrow(
      new RequiredFieldError('cpf is required'),
    )
  })

  test('Deve gerar um erro ao criar um Student sem Data de nascimento', () => {
    const cloneDummyStudent: StudentProps = {
      ...dummyStudent,
      birthDay: new Date(),
    }
    Reflect.deleteProperty(cloneDummyStudent, 'birthDay')
    expect(() => Student.create(cloneDummyStudent)).toThrow(
      new RequiredFieldError('birthDay is required'),
    )
  })

  test('Deve gerar um erro ao criar um Student sem Data de Matrícula', () => {
    const cloneDummyStudent: StudentProps = {
      ...dummyStudent,
      registrationDate: new Date(),
    }
    Reflect.deleteProperty(cloneDummyStudent, 'registrationDate')
    expect(() => Student.create(cloneDummyStudent)).toThrow(
      new RequiredFieldError('registrationDate is required'),
    )
  })

  test('Deve gerar um erro ao criar um Student tipo sanguíneo definido', () => {
    const cloneDummyStudent: StudentProps = {
      ...dummyStudent,
      blood: 'A+',
    }
    Reflect.deleteProperty(cloneDummyStudent, 'blood')
    expect(() => Student.create(cloneDummyStudent)).toThrow(
      new RequiredFieldError('blood is required'),
    )
  })
})
