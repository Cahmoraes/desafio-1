import { FSDatabase } from './fs-database'

export class TestingFSDatabase extends FSDatabase {
  constructor(randomNumber: number, databaseName: string) {
    super(`${databaseName}.test.e2e.${randomNumber}json`)
    this.truncate()
  }
}
