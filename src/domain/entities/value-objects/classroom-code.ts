import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity'

type TurnType = 'M' | 'T' | 'N'
type CharType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
interface ClassRoomProps {
  turn: TurnType
  char: CharType
}

export class ClassRoomCode extends UniqueEntityId {
  public static create(classRomProps?: ClassRoomProps): ClassRoomCode {
    return new ClassRoomCode(this.generateCode(classRomProps))
  }

  public static restore(aClassRoomCodeOrString: string): ClassRoomCode {
    return new ClassRoomCode(aClassRoomCodeOrString)
  }

  private static generateCode(classRomProps?: ClassRoomProps): string {
    return `${this.onToNineRandomNumber()}${this.classRoomChar(
      classRomProps,
    )}-${this.classRoomTurn(classRomProps)}`
  }

  private static onToNineRandomNumber(): number {
    return Math.floor(Math.random() * 9) + 1
  }

  private static classRoomChar(classRomProps?: ClassRoomProps): string {
    const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    return classRomProps
      ? classRomProps.char
      : chars[Math.floor(Math.random() * chars.length)]
  }

  private static classRoomTurn(classRomProps?: ClassRoomProps): string {
    const turns = ['M', 'T', 'N']
    return classRomProps
      ? classRomProps.turn
      : turns[Math.floor(Math.random() * turns.length)]
  }
}
