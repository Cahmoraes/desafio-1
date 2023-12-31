import { DomainEntity } from '@/core/entities/domain-entity.entity'
import { Name } from './value-objects/name'
import { Cpf } from './value-objects/cpf'
import { Bloody } from './value-objects/blood'
import { BloodType } from '@/core/enums/blood-types.enum'
import { Allergy } from './value-objects/allergy'
import { Medication } from './value-objects/medication'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity'
import { RequiredFieldError } from './errors/required-field.error'
import { ClassRoomCode } from './value-objects/classroom-code'
import { Prototype } from './interfaces/prototype'

export interface StudentProps {
  firstName: string
  lastName: string
  birthDay: Date
  allergies: string[]
  blood: BloodType
  medication: string[]
  registrationDate: Date
  parentId?: string
  cpf: string
}

type CreateStudentProps = Pick<
  StudentProps,
  'birthDay' | 'registrationDate'
> & {
  name: Name
  cpf: Cpf
  blood: Bloody
  parentId?: string
  allergies: Allergy[]
  medication: Medication[]
}

export class Student
  extends DomainEntity<CreateStudentProps>
  implements Prototype<Student>
{
  private _classRoomCode?: ClassRoomCode

  public static create(
    props: StudentProps,
    anIdOrString?: UniqueEntityId | string,
  ): Student {
    this.validate(props)
    const {
      firstName,
      lastName,
      cpf,
      blood,
      allergies,
      medication,
      parentId,
      ...rest
    } = props
    return new Student(
      {
        ...rest,
        name: Name.create(firstName, lastName),
        cpf: Cpf.create(cpf),
        blood: Bloody.create(blood),
        allergies: allergies.map(Allergy.create),
        medication: medication.map(Medication.create),
        parentId,
      },
      new UniqueEntityId(anIdOrString),
    )
  }

  public static restore(props: StudentProps, anId: string): Student {
    return Student.create(props, anId)
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

  get name(): string {
    return this.props.name.firstName
  }

  get lastName(): string {
    return this.props.name.lastName
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

  get parentId(): string | undefined {
    return this.props.parentId
  }

  public associateToParentId(aParentId: string): void {
    this.props.parentId = aParentId
  }

  public dissociateToParentId(): void {
    this.props.parentId = undefined
  }

  get birthDay(): Date {
    return this.props.birthDay
  }

  get classRoom(): ClassRoomCode | undefined {
    return this._classRoomCode
  }

  public associateToClassRoom(classRoomCode: ClassRoomCode): void {
    this._classRoomCode = classRoomCode
  }

  public dissociateClassRoom(): void {
    this._classRoomCode = undefined
  }

  public clone(fields?: Partial<StudentProps>): Student {
    return Student.create(
      {
        firstName: this.name,
        lastName: this.lastName,
        allergies: this.allergies.map(String),
        birthDay: this.birthDay,
        blood: this.blood,
        cpf: this.cpf.toString(),
        parentId: this.parentId,
        medication: this.medication.map(String),
        registrationDate: this.registrationDate,
        ...fields,
      },
      this.id,
    )
  }
}
