import { Parent } from '@/domain/entities/parent.entity'
import { CreateParentUseCase } from '../create-parent.usecase'
import { ParentsRepository } from '@/application/repositories/parents.repository'
import { Presenter } from '@/infra/presenters/presenter'

export class CreateParentUseCaseFactory {
  constructor(
    private readonly parentsRepository: ParentsRepository,
    private readonly parentsPresent: Presenter<Parent>,
  ) {}

  public create() {
    return new CreateParentUseCase(this.parentsRepository, this.parentsPresent)
  }
}
