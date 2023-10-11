import { HandlerParams } from './handler-params/handler-params'

export const enum HTTPMethodTypes {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export interface Handler {
  (handlerPrams: HandlerParams): Promise<unknown>
}

export interface HttpServer {
  listen(): Promise<void>
  on(method: HTTPMethodTypes, path: string, handler: Handler): Promise<unknown>
}
