import { Parent, ParentProps } from '@/domain/entities/parent.entity'
import { FSDatabase } from './fs-database'
import { ParentMapper } from '@/application/mappers/parent.mapper'

describe('fs-database', () => {
  let sut: FSDatabase
  const dummyParent: ParentProps = {
    name: 'any_name',
    lastName: 'any_sobrenome',
    phones: ['0123456789', '1234567890'],
    emails: ['any_email'],
    address: ['any_address'],
    cpf: 'any_cpf',
  }

  beforeEach(async () => {
    sut = new FSDatabase('parents.test.json')
    sut.createIfNotExists()
    await sut.truncate()
  })

  test('deve criar um registro no banco de dados', async () => {
    const parent = Parent.create(dummyParent)
    await sut.save(ParentMapper.toDto(parent))
    const savedParent = await sut.findById(parent.id.toString())
    expect(savedParent).toMatchObject({
      id: parent.id.toString(),
      name: parent.name,
      lastName: parent.lastName,
      phones: parent.phones.map(String),
      emails: parent.emails.map(String),
      address: parent.address.map(String),
      cpf: parent.cpf.toString(),
    })
  })

  test('deve deletar um registro no banco de dados', async () => {
    const parent = Parent.create(dummyParent)
    await sut.save(ParentMapper.toDto(parent))
    await sut.delete(parent.id.toString())
    const savedParent = await sut.findById(parent.id.toString())
    expect(savedParent).toBeNull()
  })

  test('deve retornar uma lista de todos os registros no banco de dados', async () => {
    const parent = Parent.create(dummyParent)
    await sut.save(ParentMapper.toDto(parent))
    const savedParents = await sut.getAll()
    expect(savedParents).toHaveLength(1)
    expect(savedParents[0]).toMatchObject({
      id: parent.id.toString(),
      name: parent.name,
      lastName: parent.lastName,
      phones: parent.phones.map(String),
      emails: parent.emails.map(String),
      address: parent.address.map(String),
      cpf: parent.cpf.toString(),
    })
  })

  test('deve retornar um registro pelo id', async () => {
    const parent = Parent.create(dummyParent)
    await sut.save(ParentMapper.toDto(parent))
    const savedParent = await sut.findById(parent.id.toString())
    expect(savedParent).toMatchObject({
      id: parent.id.toString(),
      name: parent.name,
      lastName: parent.lastName,
      phones: parent.phones.map(String),
      emails: parent.emails.map(String),
      address: parent.address.map(String),
      cpf: parent.cpf.toString(),
    })
  })

  test('deve atualizar um registro no banco de dados', async () => {
    const parent = Parent.create(dummyParent)
    await sut.save(ParentMapper.toDto(parent))
    await sut.update(parent.id.toString(), {
      name: 'change_name',
      lastName: 'change_sobrenome',
      phones: ['0123456789', '1234567890'],
      emails: ['any_email'],
      address: ['any_address'],
      cpf: 'any_cpf',
    })
    const savedParent = await sut.findById(parent.id.toString())
    expect(savedParent).toMatchObject({
      id: parent.id.toString(),
      name: 'change_name',
      lastName: 'change_sobrenome',
    })
  })
})
