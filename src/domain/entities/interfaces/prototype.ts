export interface Prototype<Base> {
  clone<Props = unknown>(props?: Props): Base
}
