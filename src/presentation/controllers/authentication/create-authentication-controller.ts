import { CreateAuthenticationUseCase } from "@/domain/usecases/authentication/create-authentication"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import { Controller } from "@/presentation/protocols/controller"
import { HttpResponse } from "@/presentation/protocols/http"
import { Validation } from "@/presentation/protocols/validation"

export class CreateAuthenticationController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly createAuthentication: CreateAuthenticationUseCase
	) {}

	execute = async (
		request: CreateAuthenticationController.Params
	): Promise<HttpResponse<CreateAuthenticationController.Result>> => {
		const errors = this.validation.validate(request)

		if (errors) return badRequest(errors)

		try {
			const result = await this.createAuthentication.authenticate(request)
			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace CreateAuthenticationController {
	export type Params = CreateAuthenticationUseCase.Params
	export type Result = CreateAuthenticationUseCase.Result
}
