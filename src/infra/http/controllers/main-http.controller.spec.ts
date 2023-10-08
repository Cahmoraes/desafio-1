import { Handler, HttpServer } from '../server/http-server'
import { MainHttpController } from './main-http.controller'

describe('Main Http Controller', () => {
  class FakeHttpServer implements HttpServer {
    public firedHandler = false

    async listen(): Promise<void> {
      Promise.resolve()
    }

    async on(method: string, path: string, handler: Handler): Promise<void> {
      handler({ method }, { path })
      this.firedHandler = true
    }
  }

  test('Deve executar o route handler', async () => {
    const fakeHttpServer = new FakeHttpServer()
    const mainHttpController = new MainHttpController(fakeHttpServer)
    await mainHttpController.init()
    expect(fakeHttpServer.firedHandler).toBeTruthy()
  })
})
