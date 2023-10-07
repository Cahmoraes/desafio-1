import ExtendedSet from '@cahmoraes93/extended-set'
import { ParentsRepository } from '@/application/repositories/parents.repository'
import { Parent } from '@/domain/entities/parent.entity'

export class InMemoryParentsRepository implements ParentsRepository {
  public LIMIT_PER_PAGE = 20
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

  async delete(aParent: Parent): Promise<void> {
    this.data.delete(aParent)
  }

  async allParents(page: number): Promise<Parent[]> {
    return this.data
      .toArray()
      .slice((page - 1) * this.LIMIT_PER_PAGE, page * this.LIMIT_PER_PAGE)
  }
}
