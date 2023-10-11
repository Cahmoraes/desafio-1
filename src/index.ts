import { ParentUseCaseFactory } from './application/usecases/parents/factories/parent-usecase.factory'
import { MainHttpController } from './infra/http/controllers/main-http.controller'
import { FastifyAdapter } from './infra/http/server/fastify-adapter'
import { ParentPresenter } from './infra/presenters/parent.presenter'
import { InMemoryParentsRepository } from './infra/repositories/in-memory/in-memory-parents.repository'
import getPort from 'get-port'

const parentsRepository = new InMemoryParentsRepository()
const parentPresenter = new ParentPresenter()
const parentUseCaseFactory = new ParentUseCaseFactory(
  parentsRepository,
  parentPresenter,
)

;(async () => {
  const port = await getPort()
  const server = new FastifyAdapter({
    port,
  })
  const mainHttpController = new MainHttpController(
    server,
    parentUseCaseFactory,
  )
  mainHttpController.init()
  server.listen()
})()
