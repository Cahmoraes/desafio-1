export function makeParamWithId(aPath: string, anId: string) {
  return aPath.replace(':parentId', anId)
}
