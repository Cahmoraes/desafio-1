import { Parent } from '../entities/parent.entity'

export interface ParentsRepository {
  save(aParent: Parent): Promise<void>
}
