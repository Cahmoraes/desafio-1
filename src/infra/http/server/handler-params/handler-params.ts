export interface TRequest {
  body: unknown
  params: unknown
}

export interface HandlerParams {
  request: TRequest
}
