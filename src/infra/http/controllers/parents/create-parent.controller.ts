import { ParentUseCaseFactory } from '@/application/usecases/parents/factories/parent-usecase.factory'
import { FastifyRequest } from 'fastify'

export class CreateParentController {
  constructor(private readonly parentUseCaseFactory: ParentUseCaseFactory) {
    this.bindMethod()
  }

  private bindMethod() {
    this.handleRequest = this.handleRequest.bind(this)
  }

  public handleRequest(request: FastifyRequest) {
    console.log('aqui')
  }
}
