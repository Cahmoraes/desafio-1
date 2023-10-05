import { DomainEntity } from '@/core/entities/domain-entity.entity'
import { Name } from './value-objects/name'
import { Phone } from './value-objects/phone'
import { Email } from './value-objects/email'
import { Address } from './value-objects/address'
import { Cpf } from './value-objects/cpf'

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
  'name' | 'lastName' | 'phones' | 'emails' | 'address' | 'cpf'
> & {
  name: Name
  phones: Phone[]
  emails: Email[]
  address: Address[]
  cpf: Cpf
}

export class Parent extends DomainEntity<CreateParentProps> {
  public static create(props: ParentProps) {
    const { name, lastName, phones, emails, address, cpf, ...rest } = props
    return new Parent({
      ...rest,
      name: Name.create(name, lastName),
      phones: phones.map(Phone.create),
      emails: emails.map(Email.create),
      address: address.map(Address.create),
      cpf: Cpf.create(cpf),
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

  get cpf(): Cpf {
    return this.props.cpf
  }
}
