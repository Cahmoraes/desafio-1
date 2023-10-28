import request from 'supertest'
import { FastifyAdapter } from '../../server/fastify-adapter'
import { StudentProps } from '@/domain/entities/student.entity'
import { TestingFSDatabase } from '@/infra/repositories/file-system/testing-fs-database'
import { StudentsRoutes } from './students-routes.enum'
import { makeStudentParamWithId } from '@/tests/utils/make-param-with-id'
import { makeFastifyServerKit } from '@/tests/factories/make-fastify-server-kit'
import { makeStudent } from '@/tests/factories/make-student'
import { StudentMapper } from '@/application/mappers/student.mapper'
import { FSStudentsRepository } from '@/infra/repositories/file-system/fs-students.repository'

describe('Update Student (e2e)', () => {
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

  test('Deve atualizar um Student', async () => {
    const student = makeStudent(dummyStudent)
    await studentsRepository.save(student)

    const updateResponse = await request(fastify.server)
      .put(makeStudentParamWithId(StudentsRoutes.PUT, student.id.toString()))
      .send({
        firstName: 'change_name',
        lastName: 'change_lastName',
        allergies: ['change_allergy'],
      })

    expect(updateResponse.statusCode).toBe(200)
    const updatedStudent = await studentsRepository.studentOfId(
      student.id.toString(),
    )

    expect(StudentMapper.toDto(updatedStudent!)).toMatchObject({
      id: student?.id.toString(),
      firstName: 'change_name',
      lastName: 'change_lastName',
      allergies: ['change_allergy'],
      cpf: dummyStudent.cpf.toString(),
      birthDay: dummyStudent.birthDay.toISOString(),
      medication: dummyStudent.medication,
      parentId: 'any_parent-id',
      classRoomCode: undefined,
      blood: 'A+',
      registrationDate: dummyStudent.registrationDate.toISOString(),
    })
  })
})
