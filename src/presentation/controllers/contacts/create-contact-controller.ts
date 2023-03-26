import { CreateContactUseCase } from "@/domain/usecases/contacts/create-contact"
import {
	badRequest,
	noContent,
	ok,
	serverError,
} from "@/presentation/helpers/http"
import { Controller } from "@/presentation/protocols/controller"
import { HttpResponse } from "@/presentation/protocols/http"
import { Validation } from "@/presentation/protocols/validation"

export class CreateContactController implements Controller {
	constructor(
		private readonly createContactUseCase: CreateContactUseCase,
		private readonly createContactUseCaseValidation: Validation
	) {}

	execute: CreateContactControllerExecute = async (request) => {
		// request validation
		const errors = this.createContactUseCaseValidation.validate(request)
		if (errors) return badRequest(errors)

		try {
			const result = await this.createContactUseCase.create(request)
			if (result) return ok(result)
			return noContent()
		} catch (error: any) {
			return serverError(error)
		}
	}
}

type CreateContactControllerExecute = (
	request: CreateContactUseCase.Params
) => Promise<HttpResponse<CreateContactUseCase.Result>>
