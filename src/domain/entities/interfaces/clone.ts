export interface Clone<T> {
  clone<Props>(props?: Props): T
}
