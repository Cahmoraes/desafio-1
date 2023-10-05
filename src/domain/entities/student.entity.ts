import { DomainEntity } from '@/core/entities/domain-entity.entity'
import { Name } from './value-objects/name'
import { Cpf } from './value-objects/cpf'
import { Bloody } from './value-objects/blood'
import { BloodType } from '@/core/enums/blood-types.enum'

export interface StudentProps {
  firstName: string
  lastName: string
  birthDay: Date
  parentId: string
  allergies: string[]
  blood: BloodType
  medication: string[]
  registrationDate: Date
  cpf: string
}

type CreateStudentProps = Omit<
  StudentProps,
  'firstName' | 'lastName' | 'cpf' | 'blood'
> & {
  name: Name
  cpf: Cpf
  blood: Bloody
}

export class Student extends DomainEntity<CreateStudentProps> {
  public static create(props: StudentProps): Student {
    const { firstName, lastName, cpf, blood, ...rest } = props
    return new Student({
      ...rest,
      name: Name.create(firstName, lastName),
      cpf: Cpf.create(cpf),
      blood: Bloody.create(blood),
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

  get blood(): BloodType {
    return this.props.blood.type
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
