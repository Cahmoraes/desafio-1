import { Parent } from '@/domain/entities/parent.entity'
import { Presenter } from './presenter'

export interface ParentPresenterOutput {
  id: string
  name: string
  lastName: string
  phones: string[]
  emails: string[]
  address: string[]
  cpf: string
}

export class ParentPresenter implements Presenter<Parent> {
  present(aParent: Parent): ParentPresenterOutput {
    return {
      id: aParent.id.toString(),
      name: aParent.name,
      lastName: aParent.lastName,
      phones: aParent.phones.map(String),
      emails: aParent.emails.map(String),
      address: aParent.address.map(String),
      cpf: aParent.cpf.toString(),
    }
  }
}
