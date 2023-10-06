import { InMemoryParentsRepository } from '@/infra/repositories/in-memory/in-memory-parents.repository'
import { DeleteParentUseCase } from './delete-parent.usecase'
import { Parent, ParentProps } from '../entities/parent.entity'

describe('Delete Parent Use Case', () => {
  let sut: DeleteParentUseCase
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
    sut = new DeleteParentUseCase(parentsRepository)
  })

  test('Deve criar um Parent', async () => {
    const parent = Parent.create(dummyParent)
    await parentsRepository.save(parent)

    await sut.execute({
      parentId: parent.id.toString(),
    })

    expect(parentsRepository.data.size).toBe(0)
  })

  test('Deve gerar um erro ao tentar deletar um Parent não existente', async () => {
    await expect(() =>
      sut.execute({ parentId: 'any_id' }),
    ).rejects.toThrowError('Parent of id [any_id] not found')
  })
})
