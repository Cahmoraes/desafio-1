export interface Prototype<Base> {
  clone(props?: object): Base
}
