import { DbCreateAccount } from "@/data/usecases/users/db-create-account"
import { CreateAccountUseCase } from "@/domain/usecases/users/create-account"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import { Controller } from "@/presentation/protocols/controller"
import { HttpResponse } from "@/presentation/protocols/http"
import { Validation } from "@/presentation/protocols/validation"

export class CreateAccountController implements Controller {
	constructor(
		private readonly createAccountValidation: Validation,
		private readonly createAccount: DbCreateAccount
	) {}

	async execute(
		request: CreateAccountController.RequestInput
	): Promise<HttpResponse<CreateAccountController.Result>> {
		const errors = this.createAccountValidation.validate(request.input)
		if (errors) return badRequest(errors)

		try {
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
