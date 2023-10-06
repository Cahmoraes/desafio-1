import { InMemoryParentsRepository } from '@/infra/repositories/in-memory/in-memory-parents.repository'
import { UpdateParentUseCase } from './update-parent.usecase'
import { Parent, ParentProps } from '@/domain/entities/parent.entity'

describe('Update Parent Use Case', () => {
  let sut: UpdateParentUseCase
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
    sut = new UpdateParentUseCase(parentsRepository)
  })

  test('Deve criar um Parent', async () => {
    const parent = Parent.create(dummyParent)
    await parentsRepository.save(parent)

    await sut.execute({
      parentId: parent.id.toString(),
      fields: {
        name: 'change_name',
        lastName: 'change_lastName',
      },
    })

    const repositoryData = parentsRepository.data.toArray()
    expect(repositoryData.length).toBe(1)
    expect(repositoryData[0].id.equals(parent.id)).toBeTruthy()
    expect(repositoryData[0].name).toEqual('change_name')
    expect(repositoryData[0].lastName).toEqual('change_lastName')
    expect(repositoryData[0].cpf.toString()).toEqual(dummyParent.cpf)
    expect(repositoryData[0].phones.toString()).toEqual(
      dummyParent.phones.toString(),
    )
  })

  test('Deve gerar um erro ao tentar atualizar um Parent inexistente', async () => {
    await expect(() =>
      sut.execute({ parentId: 'inexistent_id', fields: {} }),
    ).rejects.toThrowError('Parent of id [inexistent_id] not found')
  })
})
