import { DomainEntity } from '@/core/entities/domain-entity.entity'
import { Name } from './value-objects/name'
import { Phone } from './value-objects/phone'
import { Email } from './value-objects/email'
import { Address } from './value-objects/address'
import { Cpf } from './value-objects/cpf'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity'
import { RequiredFieldError } from './errors/required-field.error'
import { Prototype } from './interfaces/prototype'

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

export class Parent
  extends DomainEntity<CreateParentProps>
  implements Prototype<Parent>
{
  private readonly _studentIds: string[] = []

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
    if (!props.lastName) {
      throw new RequiredFieldError('lastName is required')
    }
    if (!props.emails.length) {
      throw new RequiredFieldError('Must be at least one email')
    }
    if (!props.address.length) {
      throw new RequiredFieldError('Must be at least one address')
    }
    if (!props.cpf.toString().length) {
      throw new RequiredFieldError('Must be at least one cpf')
    }
    if (!props.phones.length) {
      throw new RequiredFieldError('Must be at least one phone')
    }
  }

  public clone<Props = ParentProps>(fields?: Props): Parent {
    return Parent.create(
      {
        name: this.name,
        lastName: this.lastName,
        address: this.address.map((address) => address.toString()),
        emails: this.emails.map((email) => email.toString()),
        phones: this.phones.map((phone) => phone.toString()),
        cpf: this.cpf.toString(),
        ...fields,
      },
      this.id,
    )
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

  get phones(): Phone[] {
    return this.props.phones
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
