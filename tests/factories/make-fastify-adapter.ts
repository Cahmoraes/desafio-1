import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { MainHttpController } from '@/infra/http/controllers/main-http.controller'
import { FastifyAdapter } from '@/infra/http/server/fastify-adapter'
import { ParentPresenter } from '@/infra/presenters/parent.presenter'
import { FSParentsRepository } from '@/infra/repositories/file-system/fs-parents.respitory'
import { TestingFSDatabase } from '@/infra/repositories/file-system/testing-fs-database'
import getPort from 'get-port'

interface MakeFastifyServerKitOutput {
  fastify: FastifyAdapter
  testingFSDatabase: TestingFSDatabase
  parentsRepository: FSParentsRepository
}

export async function makeFastifyServerKit(): Promise<MakeFastifyServerKitOutput> {
  const port = await getPort()
  const fastify = new FastifyAdapter({ port })
  const testingFSDatabase = new TestingFSDatabase(port)
  const parentsRepository = new FSParentsRepository(testingFSDatabase)
  const parentPresenter = new ParentPresenter()
  const parentUseCaseFactory = new ParentUseCaseFactory(
    parentsRepository,
    parentPresenter,
  )
  const mainHttpController = new MainHttpController(
    fastify,
    parentUseCaseFactory,
  )
  mainHttpController.init()
  return { fastify, testingFSDatabase, parentsRepository }
}
