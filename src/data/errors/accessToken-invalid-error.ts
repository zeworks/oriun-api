export class AccessTokenInvalidError extends Error {
	constructor() {
		super("access token invalid")
		this.message = "access token invalid"
		this.name = "AccessTokenInvalidError"
	}
}
