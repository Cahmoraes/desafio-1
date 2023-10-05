import { ValueObject } from '@/core/entities/value-objects/value-object'

export class Cpf implements ValueObject {
  private _value: string

  protected constructor(aString: string) {
    this._value = aString
  }

  public static create(sString: string): Cpf {
    return new Cpf(sString)
  }

  public equals(other: object): boolean {
    if (!(other instanceof Cpf)) return false
    return other._value === this._value
  }

  public toString(): string {
    return this._value.toString()
  }
}
