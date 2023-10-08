import { ParentUseCaseFactory } from './application/usecases/parents/factories/parent-usecase.factory'
import { MainHttpController } from './infra/http/controllers/main-http.controller'
import { FastifyAdapter } from './infra/http/server/fastify-adapter'
import { ParentPresenter } from './infra/presenters/parent.presenter'
import { InMemoryParentsRepository } from './infra/repositories/in-memory/in-memory-parents.repository'

const parentsRepository = new InMemoryParentsRepository()
const parentPresenter = new ParentPresenter()
const parentUseCaseFactory = new ParentUseCaseFactory(
  parentsRepository,
  parentPresenter,
)
const server = new FastifyAdapter()
const mainHttpController = new MainHttpController(server, parentUseCaseFactory)
mainHttpController.init()
server.listen()
