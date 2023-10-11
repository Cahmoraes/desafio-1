import getPort from 'get-port'
import request from 'supertest'
import { MainHttpController } from './main-http.controller'
import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { ParentPresenter } from '@/infra/presenters/parent.presenter'
import { FastifyAdapter } from '../server/fastify-adapter'
import { ParentProps } from '@/domain/entities/parent.entity'
import { FsParentsRepository } from '@/infra/repositories/file-system/fs-parents.respitory'

describe('Create Parent (e2e)', () => {
  let fastify: FastifyAdapter
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
    const parentsRepository = new FsParentsRepository()
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

  test('Deve criar um Parent', async () => {
    const response = await request(fastify.server)
      .post('/parents')
      .send(dummyParent)

    expect(response.statusCode).toBe(200)

    const { id } = response.body
    const responseGetParent = await request(fastify.server).get(
      `/parents/${id}`,
    )

    console.log(responseGetParent.body)
    expect(responseGetParent.statusCode).toBe(200)
  })
})
