export class UsernameInUseError extends Error {
	constructor() {
		super(`this username is already in use`)
		this.name = "UsernameInUseError"
		this.message = `this username is already in use`
	}
}
