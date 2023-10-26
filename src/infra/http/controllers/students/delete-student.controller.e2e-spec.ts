import request from 'supertest'
import { FastifyAdapter } from '../../server/fastify-adapter'
import { StudentProps } from '@/domain/entities/student.entity'
import { TestingFSDatabase } from '@/infra/repositories/file-system/testing-fs-database'
import { StudentsRoutes } from './students-routes.enum'
import { makeStudentParamWithId } from '@/tests/utils/make-param-with-id'
import { makeFastifyServerKit } from '@/tests/factories/make-fastify-server-kit'
import { FSStudentsRepository } from '@/infra/repositories/file-system/fs-students.repository'
import { makeStudent } from '@/tests/factories/make-student'

describe('Delete Student (e2e)', () => {
  let fastify: FastifyAdapter
  let testingFSDatabase: TestingFSDatabase
  let studentsRepository: FSStudentsRepository
  const dummyStudent: StudentProps = {
    firstName: 'any_name',
    lastName: 'any_sobrenome',
    allergies: ['any_allergy'],
    blood: 'A+',
    birthDay: new Date(),
    medication: ['any_medication'],
    registrationDate: new Date(),
    cpf: 'any_cpf',
    parentId: 'any_parent-id',
  }

  beforeAll(async () => {
    const fastifyServerKit = await makeFastifyServerKit()
    fastify = fastifyServerKit.fastify
    testingFSDatabase = fastifyServerKit.studentsTestingFSDatabase
    studentsRepository = fastifyServerKit.studentsRepository
    await fastify.listen()
  })

  afterAll(async () => {
    await fastify.close()
    await testingFSDatabase.excludeFile()
  })

  test('Deletar criar um Student', async () => {
    const student = makeStudent(dummyStudent)
    await studentsRepository.save(student)

    const response = await request(fastify.server)
      .delete(
        makeStudentParamWithId(StudentsRoutes.DELETE, student.id.toString()),
      )
      .send(dummyStudent)

    expect(response.statusCode).toBe(200)

    const deletedStudent = await studentsRepository.studentOfId(
      student.id.toString(),
    )
    expect(deletedStudent).toBeNull()
  })
})
