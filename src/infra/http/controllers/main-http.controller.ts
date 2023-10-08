import { HTTPMethodTypes, HttpServer } from '../server/http-server'

export class MainHttpController {
  constructor(private readonly httpServer: HttpServer) {}

  public async init(): Promise<void> {
    this.httpServer.on(HTTPMethodTypes.GET, '/parents', async (req, res) => {
      return { req, res }
    })
  }
}
