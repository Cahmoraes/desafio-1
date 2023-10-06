import { Parent } from '../entities/parent.entity'

export interface ParentsRepository {
  save(aParent: Parent): Promise<void>
  update(aParent: Parent): Promise<void>
  parentOfId(aParentId: string): Promise<Parent | null>
}
