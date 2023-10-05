export class EmailRequiredError extends Error {
  constructor() {
    super('Must have at least one email')
  }
}
