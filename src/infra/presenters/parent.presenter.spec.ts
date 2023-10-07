import { Parent, ParentProps } from '@/domain/entities/parent.entity'
import { ParentPresenter } from './parent.presenter'

describe('ParentPresenter', () => {
  let sut = new ParentPresenter()
  const dummyParent: ParentProps = {
    name: 'any_name',
    lastName: 'any_sobrenome',
    phones: ['0123456789', '1234567890'],
    emails: ['any_email'],
    address: ['any_address'],
    cpf: 'any_cpf',
  }

  beforeEach(() => {
    sut = new ParentPresenter()
  })

  test('Deve retornar um objeto com as informações corretas', () => {
    const parent = Parent.create(dummyParent, 'any_id')
    const result = sut.present(parent)
    expect(result).toMatchObject({
      id: 'any_id',
      name: 'any_name',
      lastName: 'any_sobrenome',
      phones: ['0123456789', '1234567890'],
      emails: ['any_email'],
      address: ['any_address'],
      cpf: 'any_cpf',
    })
  })
})
