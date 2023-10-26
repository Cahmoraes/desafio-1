import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { StudentUseCaseFactory } from '@/application/usecases/students/factories/student-usecase.factory'
import { MainHttpController } from '@/infra/http/controllers/main-http.controller'
import { FastifyAdapter } from '@/infra/http/server/fastify-adapter'
import { ParentPresenter } from '@/infra/presenters/parent.presenter'
import { FSParentsRepository } from '@/infra/repositories/file-system/fs-parents.repository'
import { TestingFSDatabase } from '@/infra/repositories/file-system/testing-fs-database'
import getPort from 'get-port'
import { FSStudentsRepository } from '@/infra/repositories/file-system/fs-students.repository'
import { StudentPresenter } from '@/infra/presenters/student.presenter'

interface MakeFastifyServerKitOutput {
  fastify: FastifyAdapter
  parentsTestingFSDatabase: TestingFSDatabase
  parentsRepository: FSParentsRepository
  studentsRepository: FSStudentsRepository
  studentsTestingFSDatabase: TestingFSDatabase
}

export async function makeFastifyServerKit(): Promise<MakeFastifyServerKitOutput> {
  const port = await getPort()
  const fastify = new FastifyAdapter({ port })
  const parentsTestingFSDatabase = new TestingFSDatabase(port, 'parents')
  const parentsRepository = new FSParentsRepository(parentsTestingFSDatabase)
  const parentPresenter = new ParentPresenter()
  const parentUseCaseFactory = new ParentUseCaseFactory(
    parentsRepository,
    parentPresenter,
  )

  const studentsTestingFSDatabase = new TestingFSDatabase(port, 'students')
  const studentsRepository = new FSStudentsRepository(studentsTestingFSDatabase)
  const studentPresenter = new StudentPresenter()
  const studentUseCaseFactory = new StudentUseCaseFactory(
    studentsRepository,
    studentPresenter,
  )
  const mainHttpController = new MainHttpController(
    fastify,
    parentUseCaseFactory,
    studentUseCaseFactory,
  )
  mainHttpController.init()
  return {
    fastify,
    parentsTestingFSDatabase,
    parentsRepository,
    studentsRepository,
    studentsTestingFSDatabase,
  }
}
