import { Parent } from '../entities/parent.entity'
import { ParentsRepository } from '../repositories/parents.repository'

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
    if (!parent) throw new Error(`Parent of id [${parentId}] not found`)
    return {
      parent,
    }
  }
}
