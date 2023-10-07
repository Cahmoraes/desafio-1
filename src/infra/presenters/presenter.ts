export interface Presenter<Entity> {
  present(anEntity: Entity): object
}
