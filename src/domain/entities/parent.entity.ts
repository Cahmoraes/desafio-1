import { DomainEntity } from '@/core/entities/domain-entity.entity'
import { Name } from './value-objects/name'
import { Phone } from './value-objects/phone'
import { Email } from './value-objects/email'

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
  'name' | 'lastName' | 'phones' | 'emails'
> & {
  name: Name
  phones: Phone[]
  emails: Email[]
}

export class Parent extends DomainEntity<CreateParentProps> {
  public static create(props: ParentProps) {
    const { name, lastName, phones, emails, ...rest } = props
    return new Parent({
      ...rest,
      name: Name.create(name, lastName),
      phones: phones.map(Phone.create),
      emails: emails.map(Email.create),
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

  get address(): string[] {
    return this.props.address
  }

  get cpf(): string {
    return this.props.cpf
  }
}
