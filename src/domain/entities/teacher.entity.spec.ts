import { Teacher, TeacherProps } from './teacher.entity'
import { Email } from './value-objects/email'
import { Name } from './value-objects/name'
import { Phone } from './value-objects/phone'
import { Specialization } from './value-objects/specialization'

describe('Teacher Entity', () => {
  const dummyTeacher: TeacherProps = {
    firstName: 'any_name',
    lastName: 'any_sobrenome',
    cpf: 'any_cpf',
    phone: 'any_phone',
    email: 'any_email',
    hiringDate: new Date(),
    wage: 1000,
    specialization: 'any_specialization',
  }

  it('should be able to create a teacher', () => {
    const teacher = Teacher.create(dummyTeacher)
    expect(teacher).toBeInstanceOf(Teacher)
    expect(teacher.name).toBe('any_name')
    expect(teacher.lastName).toBe('any_sobrenome')
    expect(teacher.cpf).toBe('any_cpf')
    expect(teacher.fullName).toEqual(
      Name.create(dummyTeacher.firstName, dummyTeacher.lastName).toString(),
    )
    expect(teacher.phone.equals(Phone.create(dummyTeacher.phone))).toBeTruthy()
    expect(teacher.email.equals(Email.create(dummyTeacher.email))).toBeTruthy()
    expect(
      teacher.specialization.equals(
        Specialization.create(dummyTeacher.specialization),
      ),
    ).toBeTruthy()
    expect(teacher.hiringDate).toEqual(dummyTeacher.hiringDate)
    expect(teacher.wage).toEqual(dummyTeacher.wage)
  })
})
