import { ParentsRepository } from '@/application/repositories/parents.repository'
import { Parent } from '@/domain/entities/parent.entity'
import { FSDatabase } from './fs-database'
import { ParentMapper } from '@/application/mappers/parent.mapper'

export class FSParentsRepository implements ParentsRepository {
  private database: FSDatabase

  constructor(database: FSDatabase) {
    this.database = database
    this.database.createIfNotExists()
  }

  async save(aParent: Parent): Promise<void> {
    await this.database.save(ParentMapper.toDto(aParent))
  }

  async update(aParent: Parent): Promise<void> {
    await this.database.update(aParent.id.toString(), {
      name: aParent.name,
      lastName: aParent.lastName,
      phones: aParent.phones.map(String),
      emails: aParent.emails.map(String),
      address: aParent.address.map(String),
      cpf: aParent.cpf.toString(),
    })
  }

  async delete(aParent: Parent): Promise<void> {
    await this.database.delete(aParent.id.toString())
  }

  async parentOfId(aParentId: string): Promise<Parent | null> {
    const persistedParent = (await this.database.findById(aParentId)) as any
    return Parent.restore(persistedParent, persistedParent.id)
  }

  async allParents(page: number): Promise<Parent[]> {
    return this.database.getAll(page)
  }
}
