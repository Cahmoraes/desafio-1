import { Student, StudentProps } from '@/domain/entities/student.entity'
import { StudentPresenter } from './student.presenter'

describe('StudentPresenter', () => {
  let sut = new StudentPresenter()
  const registrationDate = new Date()
  const birthDay = new Date()
  const dummyStudent: StudentProps = {
    firstName: 'any_name',
    lastName: 'any_sobrenome',
    allergies: ['any_allergy'],
    blood: 'A+',
    birthDay,
    medication: ['any_medication'],
    registrationDate,
    cpf: 'any_cpf',
    parentId: 'any_parent-id',
  }

  beforeEach(() => {
    sut = new StudentPresenter()
  })

  test('Deve retornar um objeto com as informações corretas', () => {
    const student = Student.create(dummyStudent, 'any_id')
    const result = sut.present(student)
    expect(result).toMatchObject({
      id: 'any_id',
      firstName: 'any_name',
      lastName: 'any_sobrenome',
      parentId: 'any_parent-id',
      medication: ['any_medication'],
      allergies: ['any_allergy'],
      blood: 'A+',
      birthDay,
      registrationDate,
      cpf: 'any_cpf',
    })
  })
})
