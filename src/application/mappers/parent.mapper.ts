import { Parent } from '@/domain/entities/parent.entity'

export interface ParentDTO {
  id: string
  name: string
  lastName: string
  phones: string[]
  emails: string[]
  address: string[]
  cpf: string
}

export class ParentMapper {
  public static toPersist(aParent: Parent): ParentDTO {
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
