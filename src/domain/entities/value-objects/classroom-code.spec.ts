import { ClassRoomCode } from './classroom-code'

describe('ClassRoomCode', () => {
  test('Deve criar um código de turma válido', () => {
    const code = ClassRoomCode.create()
    expect(code).toBeInstanceOf(ClassRoomCode)
    expect(typeof code.toString()).toBe('string')
  })

  test('Deve criar um código de turma usando restore', () => {
    const codeString = '4E-M' // Exemplo de código
    const code = ClassRoomCode.restore(codeString)
    expect(code).toBeInstanceOf(ClassRoomCode)
    expect(code.toString()).toBe(codeString)
  })

  test('Deve retornar false quando comparado com qualquer objeto que não seja um código de turma', () => {
    const code = ClassRoomCode.create()
    expect(code.equals({})).toBeFalsy()
  })

  test('Deve comparar dois códigos de turma iguais', () => {
    const code1 = ClassRoomCode.create()
    const code2 = ClassRoomCode.restore(code1.toString())
    expect(code1.equals(code2)).toBeTruthy()
  })

  test('Deve comparar dois códigos de turma diferentes', () => {
    const code1 = ClassRoomCode.create()
    const code2 = ClassRoomCode.create()
    expect(code1.equals(code2)).toBeFalsy()
  })
})
