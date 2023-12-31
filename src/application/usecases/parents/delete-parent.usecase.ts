import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'
import { ParentsRepository } from '@/application/repositories/parents.repository'

interface DeleteParentUseCaseInput {
  parentId: string
}

type DeleteParentUseCaseOutput = void

export class DeleteParentUseCase {
  constructor(private readonly parentsRepository: ParentsRepository) {}

  public async execute({
    parentId,
  }: DeleteParentUseCaseInput): Promise<DeleteParentUseCaseOutput> {
    const parent = await this.parentsRepository.parentOfId(parentId)
    if (!parent) {
      throw new ResourceNotFoundError(`Parent of id [${parentId}] not found`)
    }
    await this.parentsRepository.delete(parent)
  }
}
