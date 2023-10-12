import 'reflect-metadata'
import { Container } from 'inversify'
import { ParentsRepository } from '@/application/repositories/parents.repository'
import { InMemoryParentsRepository } from '../repositories/in-memory/in-memory-parents.repository'
import { ParentPresenter } from '../presenters/parent.presenter'

export const TYPES = {
  ParentsRepository: Symbol.for('ParentsRepository'),
  ParentPresenter: Symbol.for('ParentPresenter'),
  CreateUserUseCase: Symbol.for('CreateUserUseCase'),
}

const container = new Container()
container
  .bind<ParentsRepository>(TYPES.ParentsRepository)
  .to(InMemoryParentsRepository)
  .inSingletonScope()

container.bind(TYPES.ParentPresenter).to(ParentPresenter)
export default container
