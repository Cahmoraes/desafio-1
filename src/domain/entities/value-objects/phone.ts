import { ValueObject } from '@/core/entities/value-objects/value-object'

export class Phone implements ValueObject {
  private _value: string

  protected constructor(aString: string) {
    this._value = aString
  }

  public static create(aString: string): Phone {
    return new Phone(aString)
  }

  public equals(other: object): boolean {
    if (!(other instanceof Phone)) return false
    return other._value === this._value
  }

  public toString(): string {
    return this._value
  }
}
