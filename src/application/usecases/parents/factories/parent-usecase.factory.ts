import { ParentsRepository } from '@/application/repositories/parents.repository'
import { Presenter } from '@/infra/presenters/presenter'
import { Parent } from '@/domain/entities/parent.entity'
import { CreateParentUseCaseFactory } from './create-parent-usecase.factory'

export class ParentUseCaseFactory {
  constructor(
    private readonly parentRepository: ParentsRepository,
    private readonly parentPresenter: Presenter<Parent>,
  ) {}

  public createCreateParentUseCaseFactory(): CreateParentUseCaseFactory {
    return new CreateParentUseCaseFactory(
      this.parentRepository,
      this.parentPresenter,
    )
  }
}
