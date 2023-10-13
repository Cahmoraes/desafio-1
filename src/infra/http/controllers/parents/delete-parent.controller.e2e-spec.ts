import getPort from 'get-port'
import request from 'supertest'
import { MainHttpController } from '../main-http.controller'
import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { ParentPresenter } from '@/infra/presenters/parent.presenter'
import { FastifyAdapter } from '../../server/fastify-adapter'
import { ParentProps } from '@/domain/entities/parent.entity'
import { FSParentsRepository } from '@/infra/repositories/file-system/fs-parents.respitory'
import { TestingFSDatabase } from '@/infra/repositories/file-system/testing-fs-database'
import { ParentsRoutes } from './parents-routes.enum'
import { makeParamWithId } from '@/tests/utils/make-param-with-id'

describe('Delete Parent (e2e)', () => {
  let fastify: FastifyAdapter
  let testingFSDatabase: TestingFSDatabase
  const dummyParent: ParentProps = {
    name: 'any_name',
    lastName: 'any_sobrenome',
    phones: ['0123456789', '1234567890'],
    emails: ['any_email'],
    address: ['any_address'],
    cpf: 'any_cpf',
  }

  beforeAll(async () => {
    const port = await getPort()
    fastify = new FastifyAdapter({ port })
    testingFSDatabase = new TestingFSDatabase()
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
    await fastify.listen()
  })

  afterAll(async () => {
    await fastify.close()
  })

  test('Deletar criar um Parent', async () => {
    const createParentResponse = await request(fastify.server)
      .post(ParentsRoutes.CREATE)
      .send(dummyParent)

    const { id } = createParentResponse.body

    await request(fastify.server)
      .delete(makeParamWithId(ParentsRoutes.DELETE, id))
      .send(dummyParent)

    const responseGetParent = await request(fastify.server).get(
      makeParamWithId(ParentsRoutes.GET, id),
    )

    // expect(responseGetParent.statusCode).toBe(500)
    // expect(responseGetParent.body).toMatchObject({
    //   message: `Parent of id [${id}] not found`,
    // })
  })
})
