export const enum HTTPMethodTypes {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export interface Handler {
  <TRequest = object, TResponse = object>(
    req: TRequest,
    res: TResponse,
  ): Promise<object>
}

export interface HttpServer {
  listen(): Promise<void>
  on(method: HTTPMethodTypes, path: string, handler: Handler): Promise<void>
}
