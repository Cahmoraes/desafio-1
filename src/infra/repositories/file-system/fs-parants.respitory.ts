import { ParentsRepository } from '@/application/repositories/parents.repository'
import { Parent } from '@/domain/entities/parent.entity'
import { FSDatabase } from './fs-database'
import { ParentMapper } from '@/application/mappers/parent.mapper'

export class FsParentsRepository implements ParentsRepository {
  private database: FSDatabase = new FSDatabase('parents')

  constructor() {
    this.database.createIfNotExists()
  }

  async save(aParent: Parent): Promise<void> {
    this.database.save(ParentMapper.toPersist(aParent))
  }

  async update(aParent: Parent): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(aParent: Parent): Promise<void> {
    this.database.delete(aParent.id.toString())
  }

  async parentOfId(aParentId: string): Promise<Parent | null> {
    return this.database.findById(aParentId)
  }

  async allParents(page: number): Promise<Parent[]> {
    return this.database.getAll(page)
  }
}
