import { ParentUseCaseFactory } from './application/usecases/parents/factories/parent-usecase.factory'
import { Parent } from './domain/entities/parent.entity'
import { MainHttpController } from './infra/http/controllers/main-http.controller'
import { FastifyAdapter } from './infra/http/server/fastify-adapter'
import { ParentPresenter } from './infra/presenters/parent.presenter'
import { FsParentsRepository } from './infra/repositories/file-system/fs-parants.respitory'
import { InMemoryParentsRepository } from './infra/repositories/in-memory/in-memory-parents.repository'
import getPort from 'get-port'

const parentsRepository = new InMemoryParentsRepository()
const parentPresenter = new ParentPresenter()
const parentUseCaseFactory = new ParentUseCaseFactory(
  parentsRepository,
  parentPresenter,
)

const fsParentsRepository = new FsParentsRepository()
// fsParentsRepository.save(
//   Parent.create({
//     name: 'any_name',
//     lastName: 'any_sobrenome',
//     phones: ['0123456789', '1234567890'],
//     emails: ['any_email'],
//     address: ['any_address'],
//     cpf: 'any_cpf',
//   }),
// )

// fsParentsRepository.save(
//   Parent.create({
//     name: 'change_name',
//     lastName: 'change_sobrenome',
//     phones: ['0123456789', '1234567890'],
//     emails: ['any_email'],
//     address: ['any_address'],
//     cpf: 'any_cpf',
//   }),
// )

// fsParentsRepository.parentOfId('123')

// ;(async () => {
//   const port = await getPort()
//   const server = new FastifyAdapter({
//     port,
//   })
//   const mainHttpController = new MainHttpController(
//     server,
//     parentUseCaseFactory,
//   )
//   mainHttpController.init()
//   server.listen()
// })()
