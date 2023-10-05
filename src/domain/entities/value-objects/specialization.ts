import { ValueObject } from '@/core/entities/value-objects/value-object'

export class Specialization implements ValueObject {
  private _value: string

  protected constructor(aString: string) {
    this._value = aString
  }

  public static create(aString: string): Specialization {
    return new Specialization(aString)
  }

  public equals(other: object): boolean {
    if (!(other instanceof Specialization)) return false
    return other._value === this._value
  }

  public toString(): string {
    return this._value
  }
}
