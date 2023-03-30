import { AccountContext } from "@/config/account-context"
import { CreateClientUseCase } from "@/domain/usecases/clients/create-client-usecase"
import {
	badRequest,
	noContent,
	ok,
	serverError,
} from "@/presentation/helpers/http"
import { Controller } from "@/presentation/protocols/controller"
import { HttpResponse } from "@/presentation/protocols/http"
import { Validation } from "@/presentation/protocols/validation"

export class CreateClientController implements Controller {
	constructor(
		private readonly createClientUseCase: CreateClientUseCase,
		private readonly createClientValidation: Validation
	) {}

	execute: CreateClientControllerExecute = async (request, context) => {
		const errors = this.createClientValidation.validate(request)
		if (errors) return badRequest(errors)

		try {
			const result = await this.createClientUseCase.create(request, context)

			if (result) return ok(result)
			return noContent()
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace CreateClientController {
	export type Request = CreateClientUseCase.Input
	export type Result = CreateClientUseCase.Output
}

type CreateClientControllerExecute = (
	request: CreateClientController.Request,
	context: AccountContext
) => Promise<HttpResponse<CreateClientController.Result>>
