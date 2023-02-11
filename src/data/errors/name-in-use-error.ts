export class NameInUseError extends Error {
	constructor() {
		super(`This name is already in use`)
		this.message = `This name is already in use`
		this.name = "NameInUseError"
	}
}
