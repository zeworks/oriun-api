export class ClientCodeInUseError extends Error {
	constructor() {
		super(`this client code already in use`)
		this.name = "ClientCodeInUseError"
		this.message = `this client code already in use`
	}
}

export class ClientIdentificationNumberInUseError extends Error {
	constructor() {
		super(`this client identification number already in use`)
		this.name = "ClientIdentificationNumberInUseError"
		this.message = `this client identification number already in use`
	}
}

export class ClientInvalidError extends Error {
	constructor() {
		super("Invalid Client")
		this.name = "ClientInvalidError"
		this.message = "Invalid Client"
	}
}
