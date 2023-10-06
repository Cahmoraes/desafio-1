import { Parent } from '../entities/parent.entity'
import { ParentsRepository } from '../repositories/parents.repository'

interface FetchParentsUseCaseInput {
  page: number
}

interface FetchParentsUseCaseOutput {
  parents: Parent[]
}

export class FetchParentsUseCase {
  constructor(private readonly parentsRepository: ParentsRepository) {}

  public async execute({
    page = 0,
  }: FetchParentsUseCaseInput): Promise<FetchParentsUseCaseOutput> {
    const parents = await this.parentsRepository.allParents(page)
    return {
      parents,
    }
  }
}
