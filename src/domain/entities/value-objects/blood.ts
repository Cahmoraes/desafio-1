import { ValueObject } from '@/core/entities/value-objects/value-object'
import { BloodType } from '../../../core/enums/blood-types.enum'

export class Bloody implements ValueObject {
  private _value: BloodType

  protected constructor(aBloodType: BloodType) {
    this._value = aBloodType
  }

  public static create(aBloodType: BloodType): Bloody {
    return new Bloody(aBloodType)
  }

  get type(): BloodType {
    return this._value
  }

  public equals(other: object): boolean {
    if (!(other instanceof Bloody)) return false
    return other._value === this._value
  }

  public toString(): string {
    return this._value
  }
}
