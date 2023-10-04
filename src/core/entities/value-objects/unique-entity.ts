import { randomUUID } from 'node:crypto'
import { ValueObject } from './value-object'

export class UniqueEntityId implements ValueObject {
  private _id: string

  constructor(aStringOrUndefined?: string | UniqueEntityId)
  constructor(anId: UniqueEntityId)
  constructor(anIdOrString?: unknown) {
    if (typeof anIdOrString === 'string') {
      this._id = anIdOrString
      return
    }
    if (anIdOrString instanceof UniqueEntityId) {
      this._id = anIdOrString._id
      return
    }
    this._id = randomUUID()
  }

  public toString(): string {
    return this._id
  }

  public equals(other: object): boolean {
    if (!(other instanceof UniqueEntityId)) return false
    return this._id === other._id
  }
}
