import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity'

type TurnType = 'M' | 'T' | 'N'
type CharType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
export interface ClassRoomCodeProps {
  number?: number
  turn?: TurnType
  char?: CharType
}

export class ClassRoomCode extends UniqueEntityId {
  public static create(
    anIdOrClassRoomProps?: UniqueEntityId | ClassRoomCodeProps,
  ): ClassRoomCode {
    if (anIdOrClassRoomProps instanceof UniqueEntityId) {
      return new ClassRoomCode(anIdOrClassRoomProps)
    }
    return new ClassRoomCode(this.generateCode(anIdOrClassRoomProps))
  }

  public static restore(aClassRoomCodeOrString: string): ClassRoomCode {
    return new ClassRoomCode(aClassRoomCodeOrString)
  }

  private static generateCode(classRomProps?: ClassRoomCodeProps): string {
    return `${this.oneToNineRandomNumber(classRomProps)}${this.classRoomChar(
      classRomProps,
    )}-${this.classRoomTurn(classRomProps)}`
  }

  private static oneToNineRandomNumber(
    classRomProps: ClassRoomCodeProps = {},
  ): number {
    return classRomProps.number ?? Math.floor(Math.random() * 9) + 1
  }

  private static classRoomChar(classRomProps: ClassRoomCodeProps = {}): string {
    const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    return classRomProps.char ?? chars[Math.floor(Math.random() * chars.length)]
  }

  private static classRoomTurn(classRomProps: ClassRoomCodeProps = {}): string {
    const turns = ['M', 'T', 'N']
    return classRomProps.turn ?? turns[Math.floor(Math.random() * turns.length)]
  }
}
