import request from 'supertest'
import { FastifyAdapter } from '../../server/fastify-adapter'
import { ParentProps } from '@/domain/entities/parent.entity'
import { TestingFSDatabase } from '@/infra/repositories/file-system/testing-fs-database'
import { ParentsRoutes } from './parents-routes.enum'
import { makeParamWithId } from '@/tests/utils/make-param-with-id'
import { makeParent } from '@/tests/factories/make-parent'
import { makeFastifyServerKit } from '@/tests/factories/make-fastify-server-kit'
import { FSParentsRepository } from '@/infra/repositories/file-system/fs-parents.repository'

describe('Get Parent (e2e)', () => {
  let fastify: FastifyAdapter
  let testingFSDatabase: TestingFSDatabase
  let parentsRepository: FSParentsRepository
  const dummyParent: ParentProps = {
    name: 'any_name',
    lastName: 'any_sobrenome',
    phones: ['0123456789', '1234567890'],
    emails: ['any_email'],
    address: ['any_address'],
    cpf: 'any_cpf',
  }

  beforeAll(async () => {
    const httpServerKit = await makeFastifyServerKit()
    fastify = httpServerKit.fastify
    testingFSDatabase = httpServerKit.parentsTestingFSDatabase
    parentsRepository = httpServerKit.parentsRepository
    await fastify.listen()
  })

  afterAll(async () => {
    await fastify.close()
    await testingFSDatabase.excludeFile()
  })

  test('Deve obter um Parent', async () => {
    const parent = makeParent(dummyParent)
    await parentsRepository.save(parent)

    const responseGetParent = await request(fastify.server).get(
      makeParamWithId(ParentsRoutes.GET, parent.id.toString()),
    )

    expect(responseGetParent.statusCode).toBe(200)
    expect(responseGetParent.body).toMatchObject({
      id: parent.id.toString(),
      name: dummyParent.name,
      lastName: dummyParent.lastName,
      phones: dummyParent.phones.map(String),
      emails: dummyParent.emails.map(String),
      address: dummyParent.address.map(String),
      cpf: dummyParent.cpf.toString(),
    })
  })
})
