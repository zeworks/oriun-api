import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact"
import { DbCreateAccount } from "@/data/usecases/users/db-create-account"
import { CreateAccountUseCase } from "@/domain/usecases/users/create-account"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import { Controller } from "@/presentation/protocols/controller"
import { HttpResponse } from "@/presentation/protocols/http"
import { Validation } from "@/presentation/protocols/validation"

export class CreateAccountController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly createContact: DbCreateContact,
		private readonly createContactValidation: Validation,
		private readonly createAccount: DbCreateAccount
	) {}

	async execute(
		request: CreateAccountController.RequestInput
	): Promise<HttpResponse<CreateAccountController.Result>> {
		const errors = this.validation.validate(request.input)

		if (errors) return badRequest(errors)

		try {
			if (request.input.contact) {
				const contactError = this.createContactValidation.validate(
					request.input.contact
				)

				if (contactError) return badRequest(contactError)

				const contact =
					(await this.createContact.create(request.input.contact)) || undefined

				const result = await this.createAccount.create({
					...request.input,
					contact,
				})

				return ok(result)
			}

			const result = await this.createAccount.create(request.input)
			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace CreateAccountController {
	export type RequestInput = {
		input: CreateAccountUseCase.Params
	}

	export type Result = CreateAccountUseCase.Result
}
