import { DomainEntity } from '@/core/entities/domain-entity.entity'
import { Name } from './value-objects/name'
import { Cpf } from './value-objects/cpf'
import { Phone } from './value-objects/phone'
import { Email } from './value-objects/email'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity'
import { Specialization } from './value-objects/specialization'
import { Prototype } from './interfaces/prototype'

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

type CreateTeacherProps = Pick<TeacherProps, 'hiringDate' | 'wage'> & {
  name: Name
  cpf: Cpf
  phone: Phone
  email: Email
  specialization: Specialization
}

export class Teacher
  extends DomainEntity<CreateTeacherProps>
  implements Prototype<Teacher>
{
  static create(
    props: TeacherProps,
    anIdOrString?: UniqueEntityId | string,
  ): Teacher {
    const { firstName, lastName, cpf, phone, email, specialization, ...rest } =
      props
    return new Teacher(
      {
        ...rest,
        name: Name.create(firstName, lastName),
        cpf: Cpf.create(cpf),
        phone: Phone.create(phone),
        email: Email.create(email),
        specialization: Specialization.create(specialization),
      },
      new UniqueEntityId(anIdOrString),
    )
  }

  public clone(fields?: Partial<TeacherProps>): Teacher {
    return Teacher.create(
      {
        firstName: this.name,
        lastName: this.lastName,
        cpf: this.cpf,
        phone: this.phone.toString(),
        email: this.email.toString(),
        specialization: this.specialization.toString(),
        hiringDate: this.hiringDate,
        wage: this.wage,
        ...fields,
      },
      this.id,
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

  get specialization(): Specialization {
    return this.props.specialization
  }

  get hiringDate(): Date {
    return this.props.hiringDate
  }

  get wage(): number {
    return this.props.wage
  }
}
