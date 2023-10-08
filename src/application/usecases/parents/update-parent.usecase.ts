import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'
import { ParentsRepository } from '@/application/repositories/parents.repository'
import { ParentProps } from '@/domain/entities/parent.entity'

interface UpdateParentUseCaseInput {
  parentId: string
  fields: Partial<ParentProps>
}
type UpdateParentUseCaseOutput = void

export class UpdateParentUseCase {
  constructor(private readonly parentsRepository: ParentsRepository) {}

  public async execute({
    parentId,
    fields,
  }: UpdateParentUseCaseInput): Promise<UpdateParentUseCaseOutput> {
    const parent = await this.parentsRepository.parentOfId(parentId)
    if (!parent) {
      throw new ResourceNotFoundError(`Parent of id [${parentId}] not found`)
    }
    const newParent = parent.clone(fields)
    await this.parentsRepository.update(newParent)
  }
}
