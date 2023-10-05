import { ValueObject } from '@/core/entities/value-objects/value-object'

export class Medication implements ValueObject {
  private _value: string

  protected constructor(aString: string) {
    this._value = aString
  }

  public static create(name: string): Medication {
    return new Medication(name)
  }

  public equals(other: object): boolean {
    if (!(other instanceof Medication)) return false
    return other._value === this._value
  }

  public toString(): string {
    return this._value.toString()
  }
}
