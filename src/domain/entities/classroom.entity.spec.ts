import { ClassRoom } from './classroom.entity'
import { ClassRoomCode } from './value-objects/classroom-code'

describe('ClassRoom Entity', () => {
  it('Deve criar uma ClassRoom', () => {
    const classRoom = ClassRoom.create({
      maxStudentsNumber: 1,
      minAge: 1,
      discipline: 'any_discipline',
      duration: 1,
    })
    expect(classRoom).toBeInstanceOf(ClassRoom)
    const code = classRoom.id
    console.log(code)
    expect(classRoom.id).toBeInstanceOf(ClassRoomCode)
    // expect(classRoom.maxStudentsNumber).toBe(1)
    // expect(classRoom.minAge).toBe(1)
    // expect(classRoom.discipline).toBe('any_discipline')
    // expect(classRoom.duration).toBe(1)
  })
})
