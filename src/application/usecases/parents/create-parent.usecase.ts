import { Parent } from '@/domain/entities/parent.entity'
import { ParentsRepository } from '../../repositories/parents.repository'
import { Presenter } from '@/infra/presenters/presenter'

interface CreateParentUseCaseInput {
  name: string
  lastName: string
  phones: string[]
  emails: string[]
  address: string[]
  cpf: string
}

type CreateParentUseCaseOutput = object

export class CreateParentUseCase {
  constructor(
    private readonly parentsRepository: ParentsRepository,
    private readonly parentPresenter: Presenter<Parent>,
  ) {}

  public async execute(
    input: CreateParentUseCaseInput,
  ): Promise<CreateParentUseCaseOutput> {
    const parent = Parent.create(input)
    await this.parentsRepository.save(parent)
    return this.parentPresenter.present(parent)
  }
}
