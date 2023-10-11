import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export class FSDatabase {
  private readonly ITEMS_PER_PAGE = 20
  private readonly FILE_EXTENSION = '.json'
  private readonly _path: string
  private readonly BASE_PATH = '../../database/'

  constructor(private readonly databaseName: string) {
    this._path = join(
      __dirname,
      `${this.BASE_PATH}${databaseName}${this.FILE_EXTENSION}`,
    )
  }

  public async createIfNotExists(): Promise<void> {
    if (await existsSync(this._path)) return
    await writeFile(this._path, '[]', 'utf-8')
  }

  public async save(anObject: object): Promise<void> {
    const persistedDTOs = await this.persistedDTOs()
    persistedDTOs.push(anObject)
    await this.persistDTOsInFile(persistedDTOs)
  }

  private async persistedDTOs(): Promise<any[]> {
    const data = await readFile(this._path, 'utf-8')
    return JSON.parse(data)
  }

  private async persistDTOsInFile(objects: any[]): Promise<void> {
    const data = JSON.stringify(objects)
    await writeFile(this._path, data, 'utf-8')
  }

  public async findById<TResult>(anId: string): Promise<TResult | null> {
    try {
      const persistedDTOs = await this.persistedDTOs()
      return persistedDTOs.find((anObject) => anObject.id === anId) || null
    } catch (error) {
      console.error(error)
      return null
    }
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

  public async update(anId: string, data: any): Promise<void> {
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
}
