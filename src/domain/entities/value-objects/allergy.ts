import { ValueObject } from '@/core/entities/value-objects/value-object'

export class Allergy implements ValueObject {
  private _value: string

  protected constructor(aString: string) {
    this._value = aString
  }

  public static create(name: string): Allergy {
    return new Allergy(name)
  }

  public equals(other: object): boolean {
    if (!(other instanceof Allergy)) return false
    return other._value === this._value
  }

  public toString(): string {
    return this._value.toString()
  }
}
