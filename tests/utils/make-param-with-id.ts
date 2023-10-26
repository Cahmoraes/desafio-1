function makeParamWithId(aPath: string, keyString: string, anId: string) {
  return aPath.replace(keyString, anId)
}

export function makeParentParamWithId(aPath: string, anId: string) {
  return makeParamWithId(aPath, ':parentId', anId)
}

export function makeStudentParamWithId(aPath: string, anId: string) {
  return makeParamWithId(aPath, ':studentId', anId)
}
