import { InMemoryParentsRepository } from '@/infra/repositories/in-memory/in-memory-parents.repository'
import { FetchParentsUseCase } from './fetch-parents.usecase'
import { Parent, ParentProps } from '../entities/parent.entity'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity'

describe('Fetch Parents Use Case', async () => {
  let sut: FetchParentsUseCase
  let parentsRepository: InMemoryParentsRepository
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
    sut = new FetchParentsUseCase(parentsRepository)
  })

  test('Deve listar Parents', async () => {
    for (let i = 0; i < 22; i++) {
      const parent = Parent.create(dummyParent, `id-${i}`)
      parentsRepository.save(parent)
    }

    const { parents } = await sut.execute({
      page: 2,
    })

    expect(parents).toHaveLength(2)
    expect(parents[0].id.toString()).toBe('id-20')
    expect(parents[1].id.toString()).toBe('id-21')
  })
})
