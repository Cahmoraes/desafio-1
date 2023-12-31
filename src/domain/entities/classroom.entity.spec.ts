import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity'
import { ClassRoom, ClassRoomProps } from './classroom.entity'
import { ClassRoomCode } from './value-objects/classroom-code'
import { DomainEntity } from '@/core/entities/domain-entity.entity'

describe('ClassRoom Entity', () => {
  const dummyClassRoom: ClassRoomProps = {
    maxStudentsNumber: 1,
    minAge: 1,
    discipline: 'any_discipline',
    duration: 1,
  }

  it('Deve criar uma ClassRoom', () => {
    const classRoom = ClassRoom.create(dummyClassRoom)
    expect(classRoom).toBeInstanceOf(ClassRoom)
    expect(classRoom).toBeInstanceOf(DomainEntity)
    expect(classRoom.id).toBeInstanceOf(ClassRoomCode)
    expect(classRoom.id).toBeInstanceOf(UniqueEntityId)
    expect(classRoom.maxStudentsNumber).toBe(1)
    expect(classRoom.minAge).toBe(1)
    expect(classRoom.discipline).toBe('any_discipline')
    expect(classRoom.duration).toBe(1)
  })

  test.each([
    '1A-M',
    '2B-T',
    '3C-N',
    '4D-M',
    '5E-T',
    '6F-N',
    '7G-M',
    '8H-T',
    '9A-N',
  ])('Deve validar um código de turma com regex', (validCodes) => {
    const isValid = /^([1-9][A-H])-(M|T|N)$/.test(validCodes)
    expect(isValid).toBeTruthy()
  })

  test.each(['0A-M', '10A-T', '2I-N', '3A-X', 'XYZ'])(
    'Deve invalidar um código de turma com regex',
    (code) => {
      const isValid = /^([1-9][A-H])-(M|T|N)$/.test(code)
      expect(isValid).toBeFalsy()
    },
  )

  test('Deve gerar um erro ao criar um ClassRoom sem disciplina', () => {
    const cloneDummyClassRoom: ClassRoomProps = {
      ...dummyClassRoom,
      discipline: '',
    }
    expect(() => ClassRoom.create(cloneDummyClassRoom)).toThrow(
      'discipline is required',
    )
  })

  test('Deve gerar um erro ao criar um ClassRoom sem duração', () => {
    const cloneDummyClassRoom: ClassRoomProps = {
      ...dummyClassRoom,
      duration: 0,
    }
    expect(() => ClassRoom.create(cloneDummyClassRoom)).toThrow(
      'duration must be greater than zero',
    )
  })

  test('Deve criar um clone com propriedades alteradas', () => {
    const classRoom = ClassRoom.create(dummyClassRoom)
    const classRoomCloned = classRoom.clone({
      discipline: 'any_other_discipline',
      duration: 2,
    })
    expect(classRoom.duration).toBe(dummyClassRoom.duration)
    expect(classRoom.discipline).toBe(dummyClassRoom.discipline)
    expect(classRoomCloned.discipline).toBe('any_other_discipline')
    expect(classRoomCloned.duration).toBe(2)
  })
})
