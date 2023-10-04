import { ValueObject } from '@/core/entities/value-objects/value-object'

export class Email implements ValueObject {
  private _value: string

  protected constructor(name: string) {
    this._value = name
  }

  public static create(name: string): Email {
    return new Email(name)
  }

  public equals(other: object): boolean {
    if (!(other instanceof Email)) return false
    return other._value === this._value
  }

  public toString(): string {
    return this._value.toString()
  }
}
