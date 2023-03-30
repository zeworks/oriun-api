export class CompanyCodeAlreadyExistsError extends Error {
	constructor() {
		super("company code already in use")
		this.name = "CompanyCodeAlreadyExistsError"
		this.message = "company code already in user"
	}
}

export class CompanyIdInvalidError extends Error {
	constructor() {
		super("invalid company id")
		this.name = "CompanyIdInvalidError"
		this.message = "invalid company id"
	}
}

export class CompanyCodeInvalidError extends Error {
	constructor() {
		super("invalid company code")
		this.name = "CompanyCodeInvalidError"
		this.message = "invalid company code"
	}
}
