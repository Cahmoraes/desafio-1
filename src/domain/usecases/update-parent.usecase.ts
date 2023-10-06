import { Parent } from '../entities/parent.entity'
import { ParentsRepository } from '../repositories/parents.repository'

interface UpdateParentUseCaseInput {
  parentId: string
  fields: {
    name?: string
    lastName?: string
    phones?: string[]
    emails?: string[]
    address?: string[]
    cpf?: string
  }
}

type UpdateParentUseCaseOutput = void

export class UpdateParentUseCase {
  constructor(private readonly parentsRepository: ParentsRepository) {}

  public async execute({
    parentId,
    fields,
  }: UpdateParentUseCaseInput): Promise<UpdateParentUseCaseOutput> {
    const parent = await this.parentsRepository.parentOfId(parentId)
    if (!parent) {
      throw new Error(`Parent of id [${parentId}] not found`)
    }
    const newParent = Parent.create(
      {
        name: parent.name,
        lastName: parent.lastName,
        address: parent.address.map((address) => address.toString()),
        emails: parent.emails.map((email) => email.toString()),
        phones: parent.phones.map((phone) => phone.toString()),
        cpf: parent.cpf.toString(),
        ...fields,
      },
      parentId,
    )
    await this.parentsRepository.update(newParent)
  }
}
