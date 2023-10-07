import { Parent } from '@/domain/entities/parent.entity'
import { ParentsRepository } from '../../repositories/parents.repository'

interface CreateParentUseCaseInput {
  name: string
  lastName: string
  phones: string[]
  emails: string[]
  address: string[]
  cpf: string
}

type CreateParentUseCaseOutput = void

export class CreateParentUseCase {
  constructor(private readonly parentsRepository: ParentsRepository) {}

  public async execute(
    input: CreateParentUseCaseInput,
  ): Promise<CreateParentUseCaseOutput> {
    const parent = Parent.create(input)
    await this.parentsRepository.save(parent)
  }
}
