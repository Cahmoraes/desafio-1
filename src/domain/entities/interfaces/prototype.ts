export interface Prototype<Base> {
  clone<Props>(props?: Props): Base
}
