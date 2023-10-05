import { RequiredFieldError } from './errors/required-field.error'
import { Parent, ParentProps } from './parent.entity'
import { Address } from './value-objects/address'
import { Cpf } from './value-objects/cpf'
import { Email } from './value-objects/email'

describe('Parent Entity', () => {
  const dummyParent: ParentProps = {
    name: 'any_name',
    lastName: 'any_sobrenome',
    phones: ['0123456789', '1234567890'],
    emails: ['any_email'],
    address: ['any_address'],
    cpf: 'any_cpf',
  }
  const dummyStudentIds = 'any_student_id'

  test('Deve criar um Parent', () => {
    const parent = Parent.create(dummyParent)
    parent.addStudent(dummyStudentIds)
    expect(parent).toBeInstanceOf(Parent)
    expect(parent.name).toBe('any_name')
    expect(parent.lastName).toBe('any_sobrenome')
    expect(parent.fullName).toBe('any_name any_sobrenome')
    expect(parent.phones).toEqual('0123456789,1234567890')
    expect(parent.emails).toBeInstanceOf(Array)
    expect(parent.emails[0]).toBeInstanceOf(Email)
    expect(parent.emails[0].toString()).toEqual('any_email')
    expect(parent.address).toBeInstanceOf(Array)
    expect(parent.address[0]).toBeInstanceOf(Address)
    expect(parent.address[0].toString()).toEqual('any_address')
    expect(parent.cpf).toBeInstanceOf(Cpf)
    expect(parent.cpf.toString()).toBe('any_cpf')
    expect(parent.studentIds).toEqual([dummyStudentIds])
  })

  test('Deve gerar um erro ao tentar criar um Parent sem e-mail', () => {
    const cloneDummyParent: ParentProps = { ...dummyParent, emails: [] }
    expect(() => Parent.create(cloneDummyParent)).toThrowError(
      'Must be at least one email',
    )
  })
})
