import { DomainEntity } from '@/core/entities/domain-entity.entity'
import { Name } from './value-objects/name'
import { Phone } from './value-objects/phone'
import { Email } from './value-objects/email'
import { Address } from './value-objects/address'
import { Cpf } from './value-objects/cpf'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity'
import { EmailRequiredError } from './errors/email-requided.error'

export interface ParentProps {
  name: string
  lastName: string
  phones: string[]
  emails: string[]
  address: string[]
  cpf: string
}

type CreateParentProps = {
  name: Name
  phones: Phone[]
  emails: Email[]
  address: Address[]
  cpf: Cpf
}

export class Parent extends DomainEntity<CreateParentProps> {
  private _studentIds: string[] = []

  public static create(
    props: ParentProps,
    anIdOrString?: UniqueEntityId | string,
  ) {
    this.validate(props)
    return new Parent(
      {
        name: Name.create(props.name, props.lastName),
        phones: props.phones.map(Phone.create),
        emails: props.emails.map(Email.create),
        address: props.address.map(Address.create),
        cpf: Cpf.create(props.cpf),
      },
      new UniqueEntityId(anIdOrString),
    )
  }

  private static validate(props: ParentProps): void {
    const { emails } = props
    if (!emails.length) throw new EmailRequiredError()
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

  get studentIds(): string[] {
    return this._studentIds
  }

  public addStudent(aString: string): void {
    this._studentIds.push(aString)
  }
}
