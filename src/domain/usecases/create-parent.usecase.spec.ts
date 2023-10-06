import { InMemoryParentsRepository } from '@/infra/repositories/in-memory/in-memory-parents.repository'
import { CreateParentUseCase } from './create-parent.usecase'

describe('Create Parent Use Case', () => {
  let sut: CreateParentUseCase
  let parentsRepository: InMemoryParentsRepository

  beforeEach(() => {
    parentsRepository = new InMemoryParentsRepository()
    sut = new CreateParentUseCase(parentsRepository)
  })

  test('Deve criar um Parent', () => {
    sut.execute({
      name: 'any_name',
      lastName: 'any_sobrenome',
      phones: ['0123456789', '1234567890'],
      emails: ['any_email'],
      address: ['any_address'],
      cpf: 'any_cpf',
    })

    expect(parentsRepository.data.size).toBe(1)
    expect(parentsRepository.data.toArray()[0].name).toEqual('any_name')
    expect(parentsRepository.data.toArray()[0].lastName).toEqual(
      'any_sobrenome',
    )
    expect(parentsRepository.data.toArray()[0].fullName).toEqual(
      'any_name any_sobrenome',
    )
    expect(parentsRepository.data.toArray()[0].phones).toEqual(
      '0123456789,1234567890',
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
})
