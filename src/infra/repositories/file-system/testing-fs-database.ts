import { FSDatabase } from './fs-database'

export class TestingFSDatabase extends FSDatabase {
  constructor(randomNumber: number) {
    super(`parents.test.e2e.${randomNumber}json`)
    this.truncate()
  }
}
