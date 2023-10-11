import { FSDatabase } from './fs-database'

export class TestingFSDatabase extends FSDatabase {
  constructor() {
    super('parents.test.e2e.json')
    this.truncate()
  }
}
