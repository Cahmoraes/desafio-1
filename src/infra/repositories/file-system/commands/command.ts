export interface Command {
  execute: () => Promise<unknown>
}
