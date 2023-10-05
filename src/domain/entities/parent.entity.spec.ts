import { Parent, ParentProps } from './parent.entity'
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

  test('Deve criar um Parent', () => {
    const parent = Parent.create(dummyParent)
    expect(parent).toBeInstanceOf(Parent)
    expect(parent.name).toBe('any_name')
    expect(parent.lastName).toBe('any_sobrenome')
    expect(parent.fullName).toBe('any_name any_sobrenome')
    expect(parent.phones).toEqual('0123456789,1234567890')
    expect(parent.emails).toBeInstanceOf(Array)
    expect(parent.emails[0]).toBeInstanceOf(Email)
    expect(parent.emails[0].toString()).toEqual('any_email')
    expect(parent.address).toEqual(['any_address'])
    expect(parent.cpf).toBe('any_cpf')
  })
})
