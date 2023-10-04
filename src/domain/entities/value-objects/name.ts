import { ValueObject } from '@/core/entities/value-objects/value-object'

export class Name implements ValueObject {
  private _firstName: string
  private _lastName: string

  protected constructor(name: string, lastName: string) {
    this._firstName = name
    this._lastName = lastName
  }

  public static create(name: string, lastName: string): Name {
    return new Name(name, lastName)
  }

  get firstName(): string {
    return this._firstName
  }

  get lastName(): string {
    return this._lastName
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`
  }

  public equals(other: object): boolean {
    if (!(other instanceof Name)) return false
    return other.fullName === this.fullName
  }

  public toString(): string {
    return this.fullName
  }
}
