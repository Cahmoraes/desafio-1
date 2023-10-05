import { DomainEntity } from '@/core/entities/domain-entity.entity'
import { Name } from './value-objects/name'
import { Cpf } from './value-objects/cpf'

export interface StudentProps {
  firstName: string
  lastName: string
  birthDay: Date
  parentId: string
  allergies: string[]
  blood: string
  medication: string[]
  registrationDate: Date
  cpf: string
}

type CreateStudentProps = Omit<
  StudentProps,
  'firstName' | 'lastName' | 'cpf'
> & {
  name: Name
  cpf: Cpf
}

export class Student extends DomainEntity<CreateStudentProps> {
  public static create(props: StudentProps): Student {
    const { firstName, lastName, cpf, ...rest } = props
    return new Student({
      ...rest,
      name: Name.create(firstName, lastName),
      cpf: Cpf.create(cpf),
    })
  }

  get fullName(): string {
    return this.props.name.fullName
  }

  get cpf(): string {
    return this.props.cpf.toString()
  }

  get registrationDate(): Date {
    return this.props.registrationDate
  }

  get allergies(): string[] {
    return this.props.allergies
  }

  get blood(): string {
    return this.props.blood
  }

  get medication(): string[] {
    return this.props.medication
  }

  get parentId(): string {
    return this.props.parentId
  }

  get birthDay(): Date {
    return this.props.birthDay
  }
}
