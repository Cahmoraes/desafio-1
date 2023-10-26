import request from 'supertest'
import { FastifyAdapter } from '../../server/fastify-adapter'
import { ParentProps } from '@/domain/entities/parent.entity'
import { TestingFSDatabase } from '@/infra/repositories/file-system/testing-fs-database'
import { ParentsRoutes } from './parents-routes.enum'
import { makeParamWithId } from '@/tests/utils/make-param-with-id'
import { makeFastifyServerKit } from '@/tests/factories/make-fastify-server-kit'
import { makeParent } from '@/tests/factories/make-parent'
import { ParentMapper } from '@/application/mappers/parent.mapper'
import { FSParentsRepository } from '@/infra/repositories/file-system/fs-parents.repository'

describe('Update Parent (e2e)', () => {
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
    testingFSDatabase = fastifyServerKit.parentsTestingFSDatabase
    parentsRepository = fastifyServerKit.parentsRepository
    await fastify.listen()
  })

  afterAll(async () => {
    await fastify.close()
    await testingFSDatabase.excludeFile()
  })

  test('Deve atualizar um Parent', async () => {
    const parent = makeParent(dummyParent)
    await parentsRepository.save(parent)

    const updateResponse = await request(fastify.server)
      .put(makeParamWithId(ParentsRoutes.PUT, parent.id.toString()))
      .send({
        name: 'change_name',
        lastName: 'change_sobrenome',
        phones: ['111111111', '000000000'],
        emails: ['any_email'],
        address: ['change_address'],
      })

    expect(updateResponse.statusCode).toBe(200)
    const updatedParent = await parentsRepository.parentOfId(
      parent.id.toString(),
    )

    expect(ParentMapper.toDto(updatedParent!)).toMatchObject({
      id: parent?.id.toString(),
      name: 'change_name',
      lastName: 'change_sobrenome',
      phones: ['111111111', '000000000'],
      emails: ['any_email'],
      address: ['change_address'],
      cpf: dummyParent.cpf.toString(),
    })
  })
})
