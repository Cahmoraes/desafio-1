import request from 'supertest'
import { FastifyAdapter } from '../../server/fastify-adapter'
import { Parent, ParentProps } from '@/domain/entities/parent.entity'
import { TestingFSDatabase } from '@/infra/repositories/file-system/testing-fs-database'
import { ParentsRoutes } from './parents-routes.enum'
import { makeParamWithId } from '@/tests/utils/make-param-with-id'
import { makeFastifyServerKit } from '@/tests/factories/make-fastify-server-kit'
import { FSParentsRepository } from '@/infra/repositories/file-system/fs-parents.repository'

describe('Delete Parent (e2e)', () => {
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
    const fastifyServerKit = await makeFastifyServerKit()
    fastify = fastifyServerKit.fastify
    testingFSDatabase = fastifyServerKit.testingFSDatabase
    parentsRepository = fastifyServerKit.parentsRepository
    await fastify.listen()
  })

  afterAll(async () => {
    await fastify.close()
    await testingFSDatabase.excludeFile()
  })

  test('Deletar criar um Parent', async () => {
    const parent = Parent.create(dummyParent)
    await parentsRepository.save(parent)

    const response = await request(fastify.server)
      .delete(makeParamWithId(ParentsRoutes.DELETE, parent.id.toString()))
      .send(dummyParent)
    expect(response.statusCode).toBe(200)

    const deletedParent = await parentsRepository.parentOfId(
      parent.id.toString(),
    )
    expect(deletedParent).toBeNull()
  })
})
