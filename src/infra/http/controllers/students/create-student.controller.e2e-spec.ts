import request from 'supertest'
import { FastifyAdapter } from '../../server/fastify-adapter'
import { StudentProps } from '@/domain/entities/student.entity'
import { TestingFSDatabase } from '@/infra/repositories/file-system/testing-fs-database'
import { StudentsRoutes } from './students-routes.enum'
import { makeFastifyServerKit } from '@/tests/factories/make-fastify-server-kit'
import { FSStudentsRepository } from '@/infra/repositories/file-system/fs-students.repository'
import { StudentMapper } from '@/application/mappers/student.mapper'

describe('Create Student (e2e)', () => {
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
    testingFSDatabase = fastifyServerKit.parentsTestingFSDatabase
    studentsRepository = fastifyServerKit.studentsRepository
    await fastify.listen()
  })

  afterAll(async () => {
    await fastify.close()
    await testingFSDatabase.excludeFile()
  })

  test('Deve criar um Student', async () => {
    const response = await request(fastify.server)
      .post(StudentsRoutes.CREATE)
      .send(dummyStudent)

    expect(response.statusCode).toBe(200)

    const student = await studentsRepository.studentOfId(response.body.id)

    expect(StudentMapper.toDto(student!)).toMatchObject({
      id: student?.id.toString(),
      firstName: dummyStudent.firstName,
      classRoomCode: undefined,
      lastName: dummyStudent.lastName,
      allergies: dummyStudent.allergies.map(String),
      birthDay: dummyStudent.birthDay.toISOString(),
      blood: dummyStudent.blood,
      medication: dummyStudent.medication.map(String),
      parentId: dummyStudent.parentId,
      registrationDate: dummyStudent.registrationDate.toISOString(),
      cpf: dummyStudent.cpf.toString(),
    })
  })
})
