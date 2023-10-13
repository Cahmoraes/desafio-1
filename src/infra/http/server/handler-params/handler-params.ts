export interface TRequest {
  body: unknown
  params: unknown
  query: unknown
}

export interface HandlerParams {
  request: TRequest
}
