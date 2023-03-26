import { UpdateContactUseCase } from "@/domain/usecases/contacts/update-contact"
import { MissingParamError } from "@/presentation/errors/missing-param-error"
import {
	badRequest,
	noContent,
	ok,
	serverError,
} from "@/presentation/helpers/http"
import { Controller } from "@/presentation/protocols/controller"
import { HttpResponse } from "@/presentation/protocols/http"

export class UpdateContactController implements Controller {
	constructor(private readonly updateContactUseCase: UpdateContactUseCase) {}

	execute: UpdateContactControllerExecute = async (request) => {
		if (!request.id) return badRequest(new MissingParamError("id"))

		try {
			const result = await this.updateContactUseCase.update(request)
			if (result) return ok(result)
			return noContent()
		} catch (error: any) {
			return serverError(error)
		}
	}
}

type UpdateContactControllerExecute = (
	request: UpdateContactUseCase.Params
) => Promise<HttpResponse<UpdateContactUseCase.Result>>
