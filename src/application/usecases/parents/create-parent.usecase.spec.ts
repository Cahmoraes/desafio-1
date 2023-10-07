import { InMemoryParentsRepository } from '@/infra/repositories/in-memory/in-memory-parents.repository'
import { CreateParentUseCase } from './create-parent.usecase'
import { Phone } from '@/domain/entities/value-objects/phone'
import { Parent, ParentProps } from '@/domain/entities/parent.entity'
import { ParentPresenter } from '@/infra/presenters/parent.presenter'
import { Email } from '@/domain/entities/value-objects/email'

describe('Create Parent Use Case', () => {
  let sut: CreateParentUseCase
  let parentsRepository: InMemoryParentsRepository
  let parentPresenter: ParentPresenter
  const dummyParent: ParentProps = {
    name: 'any_name',
    lastName: 'any_sobrenome',
    phones: ['0123456789', '1234567890'],
    emails: ['any_email'],
    address: ['any_address'],
    cpf: 'any_cpf',
  }

  beforeEach(() => {
    parentsRepository = new InMemoryParentsRepository()
    parentPresenter = new ParentPresenter()
    sut = new CreateParentUseCase(parentsRepository, parentPresenter)
  })

  test('Deve criar um Parent', async () => {
    await sut.execute(dummyParent)
    expect(parentsRepository.data.size).toBe(1)
    expect(parentsRepository.data.toArray()[0].name).toEqual('any_name')
    expect(parentsRepository.data.toArray()[0].lastName).toEqual(
      'any_sobrenome',
    )
    expect(parentsRepository.data.toArray()[0].fullName).toEqual(
      'any_name any_sobrenome',
    )
    expect(parentsRepository.data.toArray()[0].phones).toEqual(
      expect.arrayContaining(['0123456789', '1234567890'].map(Phone.create)),
    )
    expect(parentsRepository.data.toArray()[0].emails[0].toString()).toEqual(
      'any_email',
    )
    expect(parentsRepository.data.toArray()[0].address[0].toString()).toEqual(
      'any_address',
    )
    expect(parentsRepository.data.toArray()[0].cpf.toString()).toEqual(
      'any_cpf',
    )
  })

  test('Deve criar um clone de uma Parent com propriedades alteradas', () => {
    const parent = Parent.create(dummyParent)
    const clonedParent = parent.clone({
      address: ['any_other_address'],
      emails: [parent.emails[0].toString(), 'another_email@example.com'],
    })
    expect(clonedParent).toBeInstanceOf(Parent)
    expect(clonedParent.address[0].toString()).toEqual('any_other_address')
    expect(clonedParent.emails).toEqual(
      [parent.emails[0].toString(), 'another_email@example.com'].map(
        Email.create,
      ),
    )
  })
})
