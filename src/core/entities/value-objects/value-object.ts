export interface ValueObject {
  equals(other: object): boolean
  toString(): string
}
