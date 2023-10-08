export interface Handler {
  (req: object, res: object): void
}

export interface HttpServer {
  listen(): Promise<void>
  on(method: string, path: string, handler: Handler): Promise<void>
}
