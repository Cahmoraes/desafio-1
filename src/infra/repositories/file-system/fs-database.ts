import {
  existsSync,
  createWriteStream,
  createReadStream,
  writeFileSync,
  ReadStream,
} from 'node:fs'
import { join } from 'node:path'

export class FSDatabase {
  private readonly FILE_EXTENSION = '.json'
  private readonly _path: string
  private readonly BASE_PATH = '../../database/'
  private readonly _readStream: ReadStream
  private readonly ITEMS_PER_PAGE = 20

  constructor(private readonly databaseName: string) {
    this._path = join(
      __dirname,
      `${this.BASE_PATH}${databaseName}${this.FILE_EXTENSION}`,
    )
    this._readStream = createReadStream(this._path, 'utf-8')
  }

  public createIfNotExists(): void {
    if (existsSync(this._path)) return
    writeFileSync(this._path, '[]')
  }

  public async save(anObject: object) {
    const parentsDto = await this.persistedDTOs()
    parentsDto.push(anObject)
    console.log(parentsDto)
    this.persistDTOsInFile(parentsDto)
  }

  private get readStream(): ReadStream {
    return this._readStream
  }

  private persistedDTOs(): Promise<any[]> {
    let streams = ''
    return new Promise((resolve) => {
      this.readStream.on('data', (chunk: string) => {
        streams += chunk
      })
      this.readStream.on('end', () => {
        resolve(JSON.parse(streams))
      })
    })
  }

  private persistDTOsInFile(objects: any[]) {
    const data = JSON.stringify(objects)
    createWriteStream(this._path, 'utf-8').write(data)
  }

  public async findById<TResult>(anId: string): Promise<TResult | null> {
    const persistedDTOs = await this.persistedDTOs()
    return persistedDTOs.find((anObject) => anObject.id === anId)
  }

  public async delete(anId: string): Promise<void> {
    const persistedDTOs = await this.persistedDTOs()
    const indexToRemove = persistedDTOs.findIndex(
      (anObject) => anObject.id === anId,
    )
    if (indexToRemove === -1) return
    persistedDTOs.splice(indexToRemove, 1)
    this.persistDTOsInFile(persistedDTOs)
    this.persistDTOsInFile(persistedDTOs)
  }

  public async getAll<TResult>(page = 1): Promise<TResult[]> {
    return (await this.persistedDTOs()).slice(
      (page - 1) * this.ITEMS_PER_PAGE,
      page * this.ITEMS_PER_PAGE,
    )
  }
}
