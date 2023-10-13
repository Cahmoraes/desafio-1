import { FastifyRequest } from 'fastify'
import { HandlerParams, TRequest } from './handler-params'

export class FastifyHandlerParams implements HandlerParams {
  constructor(private readonly _request: FastifyRequest) {}

  get request(): TRequest {
    return {
      body: this._request.body,
      params: this._request.params,
      query: this._request.query,
    }
  }
}
