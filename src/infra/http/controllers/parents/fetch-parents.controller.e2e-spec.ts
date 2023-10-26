import request from 'supertest'
import { FastifyAdapter } from '../../server/fastify-adapter'
import { TestingFSDatabase } from '@/infra/repositories/file-system/testing-fs-database'
import { ParentsRoutes } from './parents-routes.enum'
import { makeFastifyServerKit } from '@/tests/factories/make-fastify-server-kit'
import { makeParent } from '@/tests/factories/make-parent'
import { FSParentsRepository } from '@/infra/repositories/file-system/fs-parents.repository'

describe('Fetch Parents (e2e)', () => {
  let fastify: FastifyAdapter
  let testingFSDatabase: TestingFSDatabase
  let parentsRepository: FSParentsRepository

  beforeAll(async () => {
    const fastifyServerKit = await makeFastifyServerKit()
    fastify = fastifyServerKit.fastify
    testingFSDatabase = fastifyServerKit.parentsTestingFSDatabase
    parentsRepository = fastifyServerKit.parentsRepository
    await fastify.listen()
  })

  afterAll(async () => {
    await fastify.close()
    await testingFSDatabase.excludeFile()
  })

  test('Deve criar um Parent', async () => {
    await parentsRepository.save(makeParent())
    await parentsRepository.save(makeParent())
    await parentsRepository.save(makeParent())
    const responseFetchParents = await request(fastify.server).get(
      `${ParentsRoutes.FETCH}?page=1`,
    )
    expect(responseFetchParents.statusCode).toBe(200)
    expect(responseFetchParents.body.parents).toHaveLength(3)
  })
})
