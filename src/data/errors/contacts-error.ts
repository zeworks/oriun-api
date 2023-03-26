export class ContactInvalidError extends Error {
	constructor() {
		super(`contact invalid`)
		this.name = "ContactInvalidError"
		this.message = `contact invalid`
	}
}
