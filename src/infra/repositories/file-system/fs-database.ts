import { readFile, writeFile, access, unlink } from 'node:fs/promises'
import { join } from 'path'

export class FSDatabase {
  private readonly ITEMS_PER_PAGE = 20
  private readonly FILE_EXTENSION = '.json'
  private readonly _path: string
  private readonly BASE_PATH = '../../database/'

  constructor(private readonly databaseName: string) {
    this._path = join(
      __dirname,
      `${this.BASE_PATH}${this.databaseName}${this.FILE_EXTENSION}`,
    )
  }

  public async createIfNotExists(): Promise<void> {
    try {
      await access(this._path)
    } catch {
      await writeFile(this._path, '[]', 'utf-8')
    }
  }

  public async save(anObject: object): Promise<void> {
    const persistedDTOs = await this.persistedDTOs()
    persistedDTOs.push(anObject)
    await this.persistDTOsInFile(persistedDTOs)
  }

  private async persistedDTOs(): Promise<any[]> {
    try {
      const data = await readFile(this._path, 'utf-8')
      return JSON.parse(data)
    } catch {
      return []
    }
  }

  private async persistDTOsInFile(objects: object[]): Promise<void> {
    const data = JSON.stringify(objects)
    await writeFile(this._path, data, 'utf-8')
  }

  public async findById<TResult>(anId: string): Promise<TResult | null> {
    const persistedDTOs = await this.persistedDTOs()
    return persistedDTOs.find((anObject) => anObject.id === anId) ?? null
  }

  public async delete(anId: string): Promise<void> {
    const persistedDTOs = await this.persistedDTOs()
    const indexToRemove = persistedDTOs.findIndex(
      (anObject) => anObject.id === anId,
    )
    if (indexToRemove === -1) return
    persistedDTOs.splice(indexToRemove, 1)
    await this.persistDTOsInFile(persistedDTOs)
  }

  public async getAll<TResult>(page = 1): Promise<TResult[]> {
    const persistedDTOs = await this.persistedDTOs()
    return persistedDTOs.slice(
      (page - 1) * this.ITEMS_PER_PAGE,
      page * this.ITEMS_PER_PAGE,
    )
  }

  public async update(anId: string, data: object): Promise<void> {
    const persistedDTOs = await this.persistedDTOs()
    const indexToUpdate = persistedDTOs.findIndex(
      (anObject) => anObject.id === anId,
    )
    if (indexToUpdate === -1) return
    persistedDTOs[indexToUpdate] = {
      id: anId,
      ...data,
    }
    await this.persistDTOsInFile(persistedDTOs)
  }

  public async truncate(): Promise<void> {
    await writeFile(this._path, '[]', 'utf-8')
  }

  public async excludeFile(): Promise<void> {
    try {
      await access(this._path)
      await unlink(this._path)
    } catch (error) {
      console.log(error)
    }
  }
}
