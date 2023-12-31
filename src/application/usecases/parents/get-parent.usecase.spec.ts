import { InMemoryParentsRepository } from '@/infra/repositories/in-memory/in-memory-parents.repository'
import { GetParentUseCase } from './get-parent.usecase'
import { Parent, ParentProps } from '@/domain/entities/parent.entity'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'
import { ParentPresenter } from '@/infra/presenters/parent.presenter'

describe('Get Parent Use Case', async () => {
  let sut: GetParentUseCase
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
    sut = new GetParentUseCase(parentsRepository, new ParentPresenter())
  })

  test('Deve listar Parents', async () => {
    for (let i = 0; i < 22; i++) {
      const parent = Parent.create(dummyParent, `id-${i}`)
      parentsRepository.save(parent)
    }

    const parent = (await sut.execute({
      parentId: 'id-20',
    })) as any

    expect(parent.id.toString()).toBe('id-20')
  })

  test('Deve gerar um erro ao tentar deletar um Parent não existente', async () => {
    await expect(() =>
      sut.execute({ parentId: 'any_id' }),
    ).rejects.toThrowError(
      new ResourceNotFoundError('Parent of id [any_id] not found'),
    )
  })
})
