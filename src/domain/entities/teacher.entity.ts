import { DomainEntity } from '@/core/entities/domain-entity.entity'
import { Name } from './value-objects/name'
import { Cpf } from './value-objects/cpf'
import { Phone } from './value-objects/phone'
import { Email } from './value-objects/email'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity'

export interface TeacherProps {
  firstName: string
  lastName: string
  cpf: string
  phone: string
  email: string
  hiringDate: Date
  wage: number
  specialization: string
}

type CreateTeacherProps = Pick<
  TeacherProps,
  'hiringDate' | 'wage' | 'specialization'
> & {
  name: Name
  cpf: Cpf
  phone: Phone
  email: Email
}

export class Teacher extends DomainEntity<CreateTeacherProps> {
  static create(
    props: TeacherProps,
    anIdOrString?: UniqueEntityId | string,
  ): Teacher {
    const { firstName, lastName, cpf, phone, email, ...rest } = props
    return new Teacher(
      {
        ...rest,
        name: Name.create(firstName, lastName),
        cpf: Cpf.create(cpf),
        phone: Phone.create(phone),
        email: Email.create(email),
      },
      new UniqueEntityId(anIdOrString),
    )
  }

  get fullName(): string {
    return this.props.name.fullName
  }

  get cpf(): string {
    return this.props.cpf.toString()
  }

  get name(): string {
    return this.props.name.firstName
  }

  get lastName(): string {
    return this.props.name.lastName
  }

  get phone(): Phone {
    return this.props.phone
  }

  get email(): Email {
    return this.props.email
  }
}
