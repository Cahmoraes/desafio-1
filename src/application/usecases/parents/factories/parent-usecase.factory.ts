import { ParentsRepository } from '@/application/repositories/parents.repository'
import { Presenter } from '@/infra/presenters/presenter'
import { Parent } from '@/domain/entities/parent.entity'
import { CreateParentUseCase } from '../create-parent.usecase'
import { DeleteParentUseCase } from '../delete-parent.usecase'
import { UpdateParentUseCase } from '../update-parent.usecase'
import { GetParentUseCase } from '../get-parent.usecase'
import { FetchParentsUseCase } from '../fetch-parents.usecase'

export class ParentUseCaseFactory {
  constructor(
    private readonly parentsRepository: ParentsRepository,
    private readonly parentPresenter: Presenter<Parent>,
  ) {}

  public createCreateParentUseCase(): CreateParentUseCase {
    return new CreateParentUseCase(this.parentsRepository, this.parentPresenter)
  }

  public createDeleteParentUseCase(): DeleteParentUseCase {
    return new DeleteParentUseCase(this.parentsRepository)
  }

  public createFetchParentsUseCase(): FetchParentsUseCase {
    return new FetchParentsUseCase(this.parentsRepository)
  }

  public createGetParentUseCase(): GetParentUseCase {
    return new GetParentUseCase(this.parentsRepository)
  }

  public createUpdateParentUseCase(): UpdateParentUseCase {
    return new UpdateParentUseCase(this.parentsRepository)
  }
}
