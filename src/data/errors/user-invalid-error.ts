export class UserInvalidError extends Error {
	constructor() {
		super("User Invalid")
		this.name = "UserInvalidError"
		this.message = "User Invalid"
	}
}
