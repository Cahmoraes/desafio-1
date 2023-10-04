import { UniqueEntityId } from './value-objects/unique-entity'

export abstract class DomainEntity<Props> {
  private _id: UniqueEntityId
  private _props: Props

  protected constructor(props: Props, anId?: string | UniqueEntityId) {
    this._id = new UniqueEntityId(anId)
    this._props = props
  }

  get id(): UniqueEntityId {
    return this._id
  }

  protected get props(): Props {
    return this._props
  }
}
