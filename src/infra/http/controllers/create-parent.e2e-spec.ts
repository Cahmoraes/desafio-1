import getPort from 'get-port'
import request from 'supertest'
import { setTimeout } from 'node:timers/promises'
import { MainHttpController } from './main-http.controller'
import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { ParentPresenter } from '@/infra/presenters/parent.presenter'
import { FastifyAdapter } from '../server/fastify-adapter'
import { ParentProps } from '@/domain/entities/parent.entity'
import { FSParentsRepository } from '@/infra/repositories/file-system/fs-parents.respitory'
import { TestingFSDatabase } from '@/infra/repositories/file-system/testing-fs-database'

describe('Create Parent (e2e)', () => {
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

  test('Deve criar um Parent', async () => {
    const response = await request(fastify.server)
      .post('/parents')
      .send(dummyParent)

    expect(response.statusCode).toBe(200)

    const { id } = response.body
    const responseGetParent = await request(fastify.server).get(
      `/parents/${id}`,
    )

    expect(responseGetParent.statusCode).toBe(200)
    expect(responseGetParent.body.parent).toMatchObject({
      id,
      name: dummyParent.name,
      lastName: dummyParent.lastName,
      phones: dummyParent.phones.map(String),
      emails: dummyParent.emails.map(String),
      address: dummyParent.address.map(String),
      cpf: dummyParent.cpf.toString(),
    })
  })
})
