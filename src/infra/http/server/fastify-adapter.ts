import { Server } from 'node:http'
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { HTTPMethodTypes, Handler, HttpServer } from './http-server'

export interface FastifyAdapterProps {
  port: number
}

export class FastifyAdapter implements HttpServer {
  private readonly httpServer: FastifyInstance = Fastify()
  constructor(private config: FastifyAdapterProps) {}

  public async listen(): Promise<void> {
    try {
      await this.httpServer.listen({ port: this.config.port, host: '0.0.0.0' })
      console.log('server started on port', this.config.port)
    } catch (err) {
      this.httpServer.log.error(err)
      process.exit(1)
    }
  }

  public async on(
    method: HTTPMethodTypes,
    path: string,
    handler: Handler,
  ): Promise<void> {
    this.httpServer[method](
      path,
      async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        const response = await handler(request, reply)
        return reply.status(200).send(response)
      },
    )
  }

  public get server(): Server {
    return this.httpServer.server
  }

  public async close(): Promise<void> {
    this.httpServer.close()
  }
}
