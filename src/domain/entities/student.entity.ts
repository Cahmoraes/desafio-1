import { DomainEntity } from '@/core/entities/domain-entity.entity'
import { Name } from './value-objects/name'
import { Cpf } from './value-objects/cpf'
import { Bloody } from './value-objects/blood'
import { BloodType } from '@/core/enums/blood-types.enum'
import { Allergy } from './value-objects/allergy'
import { Medication } from './value-objects/medication'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity'
import { RequiredFieldError } from './errors/required-field.error'

export interface StudentProps {
  firstName: string
  lastName: string
  birthDay: Date
  allergies: string[]
  blood: BloodType
  medication: string[]
  registrationDate: Date
  parentId: string
  cpf: string
}

type CreateStudentProps = Pick<
  StudentProps,
  'birthDay' | 'registrationDate'
> & {
  name: Name
  cpf: Cpf
  blood: Bloody
  parentId: string
  allergies: Allergy[]
  medication: Medication[]
}

export class Student extends DomainEntity<CreateStudentProps> {
  public static create(
    props: StudentProps,
    anIdOrString?: UniqueEntityId | string,
  ): Student {
    this.validate(props)
    const { firstName, lastName, cpf, blood, allergies, medication, ...rest } =
      props
    return new Student(
      {
        ...rest,
        name: Name.create(firstName, lastName),
        cpf: Cpf.create(cpf),
        blood: Bloody.create(blood),
        allergies: allergies.map(Allergy.create),
        medication: medication.map(Medication.create),
      },
      new UniqueEntityId(anIdOrString),
    )
  }

  private static validate(props: StudentProps): void {
    if (!props.firstName.length) {
      throw new RequiredFieldError('firstName is required')
    }
    if (!props.lastName.length) {
      throw new RequiredFieldError('lastName is required')
    }
    if (!props.birthDay) {
      throw new RequiredFieldError('birthDay is required')
    }
    if (!props.registrationDate) {
      throw new RequiredFieldError('registrationDate is required')
    }
    if (!props.cpf.toString().length) {
      throw new RequiredFieldError('cpf is required')
    }
    if (!props.blood) {
      throw new RequiredFieldError('blood is required')
    }
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

  get allergies(): Allergy[] {
    return this.props.allergies
  }

  get blood(): BloodType {
    return this.props.blood.type
  }

  get medication(): Medication[] {
    return this.props.medication
  }

  get parentId(): string {
    return this.props.parentId
  }

  get birthDay(): Date {
    return this.props.birthDay
  }
}
