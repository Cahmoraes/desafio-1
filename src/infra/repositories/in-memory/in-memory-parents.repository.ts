import { Parent } from '@/domain/entities/parent.entity'
import { ParentsRepository } from '@/domain/repositories/parents.repository'
import ExtendedSet from '@cahmoraes93/extended-set'

export class InMemoryParentsRepository implements ParentsRepository {
  public data = new ExtendedSet<Parent>()

  async save(aParent: Parent): Promise<void> {
    this.data.add(aParent)
  }

  async update(aParent: Parent): Promise<void> {
    const parentToDelete = this.data.find((parent) =>
      parent.id.equals(aParent.id),
    )
    if (parentToDelete) this.data.delete(parentToDelete)
    this.data.add(aParent)
  }

  async parentOfId(aParentId: string): Promise<Parent | null> {
    return this.data.find((parent) => parent.id.toString() === aParentId)
  }
}
