import { setTimeout } from 'node:timers/promises'
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
    const persistedParent: any = await this.retry(() =>
      this.performParentOfId(aParent.id.toString()),
    )
    if (!persistedParent) throw new Error('Parent not exists')
    await this.performUpdate(aParent)
  }

  private async retry(
    fn: () => Promise<any>,
    retries = 3,
    milliseconds = 1000,
  ): Promise<any> {
    await setTimeout(retries * milliseconds)
    const persistedParent = await fn()
    if (persistedParent) return persistedParent
    if (--retries > 0) return this.retry(fn, retries)
    return persistedParent
  }

  private async performUpdate(aParent: Parent): Promise<void> {
    await this.database.update(aParent.id.toString(), {
      name: aParent.name,
      lastName: aParent.lastName,
      phones: aParent.phones.map(String),
      emails: aParent.emails.map(String),
      address: aParent.address.map(String),
      cpf: aParent.cpf.toString(),
    })
    await this.parentOfId(aParent.id.toString())
  }

  async delete(aParent: Parent): Promise<void> {
    await this.database.delete(aParent.id.toString())
  }

  async parentOfId(aParentId: string): Promise<Parent | null> {
    const persistedParent = await this.retry(() =>
      this.performParentOfId(aParentId),
    )
    if (!persistedParent) return null
    return Parent.restore(persistedParent, persistedParent.id)
  }

  private async performParentOfId(aParentId: string): Promise<object | null> {
    return this.database.findById(aParentId)
  }

  async allParents(page: number): Promise<Parent[]> {
    return this.database.getAll(page)
  }
}
