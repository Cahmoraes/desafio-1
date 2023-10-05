import { DomainEntity } from '@/core/entities/domain-entity.entity'
import { Name } from './value-objects/name'
import { Cpf } from './value-objects/cpf'
import { Bloody } from './value-objects/blood'
import { BloodType } from '@/core/enums/blood-types.enum'
import { Allergy } from './value-objects/allergy'
import { Medication } from './value-objects/medication'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity'

export interface StudentProps {
  firstName: string
  lastName: string
  birthDay: Date
  parentsId: string[]
  allergies: string[]
  blood: BloodType
  medication: string[]
  registrationDate: Date
  cpf: string
}

type CreateStudentProps = Pick<
  StudentProps,
  'birthDay' | 'registrationDate' | 'parentsId'
> & {
  name: Name
  cpf: Cpf
  blood: Bloody
  allergies: Allergy[]
  medication: Medication[]
}

export class Student extends DomainEntity<CreateStudentProps> {
  public static create(
    props: StudentProps,
    anIdOrString?: UniqueEntityId | string,
  ): Student {
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

  get parentsId(): string[] {
    return this.props.parentsId
  }

  get birthDay(): Date {
    return this.props.birthDay
  }
}
