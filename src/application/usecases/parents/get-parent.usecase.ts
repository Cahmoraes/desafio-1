import { ResourceNotFoundError } from '@/application/errors/resource-not-found.error'
import { ParentsRepository } from '@/application/repositories/parents.repository'
import { Parent } from '@/domain/entities/parent.entity'
import { Presenter } from '@/infra/presenters/presenter'

interface GetParentUseCaseInput {
  parentId: string
}

type GetParentUseCaseOutput = object

export class GetParentUseCase {
  constructor(
    private readonly parentsRepository: ParentsRepository,
    private readonly parentPresenter: Presenter<Parent>,
  ) {}

  public async execute({
    parentId,
  }: GetParentUseCaseInput): Promise<GetParentUseCaseOutput> {
    const parent = await this.parentsRepository.parentOfId(parentId)
    if (!parent) {
      throw new ResourceNotFoundError(`Parent of id [${parentId}] not found`)
    }
    return this.parentPresenter.present(parent)
  }
}
