import { Parent } from '@/domain/entities/parent.entity'
import { ParentsRepository } from '@/domain/repositories/parents.repository'
import ExtendedSet from '@cahmoraes93/extended-set'

export class InMemoryParentsRepository implements ParentsRepository {
  public data = new ExtendedSet<Parent>()

  async save(aParent: Parent): Promise<void> {
    this.data.add(aParent)
  }
}
