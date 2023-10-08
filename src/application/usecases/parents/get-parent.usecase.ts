import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'
import { ParentsRepository } from '@/application/repositories/parents.repository'
import { Parent } from '@/domain/entities/parent.entity'

interface GetParentUseCaseInput {
  parentId: string
}

interface GetParentUseCaseOutput {
  parent: Parent
}

export class GetParentUseCase {
  constructor(private readonly parentsRepository: ParentsRepository) {}

  public async execute({
    parentId,
  }: GetParentUseCaseInput): Promise<GetParentUseCaseOutput> {
    const parent = await this.parentsRepository.parentOfId(parentId)
    if (!parent) {
      throw new ResourceNotFoundError(`Parent of id [${parentId}] not found`)
    }
    return {
      parent,
    }
  }
}
