export const enum HTTPMethodTypes {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export interface Handler {
  (req: object, res: object): void
}

export interface HttpServer {
  listen(): Promise<void>
  on(method: HTTPMethodTypes, path: string, handler: Handler): Promise<void>
}
