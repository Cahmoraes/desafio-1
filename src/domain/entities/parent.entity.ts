import { DomainEntity } from '@/core/entities/domain-entity.entity'
import { Name } from './value-objects/name'
import { Phone } from './value-objects/phone'
import { Email } from './value-objects/email'
import { Address } from './value-objects/address'

export interface ParentProps {
  name: string
  lastName: string
  phones: string[]
  emails: string[]
  address: string[]
  cpf: string
}

type CreateParentProps = Omit<
  ParentProps,
  'name' | 'lastName' | 'phones' | 'emails' | 'address'
> & {
  name: Name
  phones: Phone[]
  emails: Email[]
  address: Address[]
}

export class Parent extends DomainEntity<CreateParentProps> {
  public static create(props: ParentProps) {
    const { name, lastName, phones, emails, address, ...rest } = props
    return new Parent({
      ...rest,
      name: Name.create(name, lastName),
      phones: phones.map(Phone.create),
      emails: emails.map(Email.create),
      address: address.map(Address.create),
    })
  }

  get name(): string {
    return this.props.name.firstName
  }

  get lastName(): string {
    return this.props.name.lastName
  }

  get fullName(): string {
    return this.props.name.fullName
  }

  get phones(): string {
    return this.props.phones.toString()
  }

  get emails(): Email[] {
    return this.props.emails
  }

  get address(): Address[] {
    return this.props.address
  }

  get cpf(): string {
    return this.props.cpf
  }
}
