import { ValueObject } from '@/core/entities/value-objects/value-object'

export class Address implements ValueObject {
  private _value: string

  protected constructor(aString: string) {
    this._value = aString
  }

  public static create(name: string): Address {
    return new Address(name)
  }

  public equals(other: object): boolean {
    if (!(other instanceof Address)) return false
    return other._value === this._value
  }

  public toString(): string {
    return this._value.toString()
  }
}
