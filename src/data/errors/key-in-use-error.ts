export class KeyInUseError extends Error {
  constructor(key: string = "") {
    super(`key ${key} in use`)
    this.name = 'KeyInUseError'
    this.message = `key ${key} in use`
  }
}
