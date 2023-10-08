import Fastify, { FastifyInstance } from 'fastify'
import { Handler, HttpServer } from './http-server'

export class FastifyAdapter implements HttpServer {
  private readonly server: FastifyInstance = Fastify()

  public async listen(): Promise<void> {
    try {
      await this.server.listen({ port: 3000 })
    } catch (err) {
      this.server.log.error(err)
      process.exit(1)
    }
  }

  public async on(
    method: string,
    path: string,
    handler: Handler,
  ): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
