export interface Prototype<T> {
  clone<Props>(props?: Props): T
}
