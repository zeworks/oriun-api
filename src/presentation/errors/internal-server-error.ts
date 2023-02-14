export class InternalServerError extends Error {
	constructor(message?: string, stack?: string) {
		super("Internal server error")
		this.name = "ServerError"
		this.message = message || "Internal server Error"
		this.stack = stack
	}
}
