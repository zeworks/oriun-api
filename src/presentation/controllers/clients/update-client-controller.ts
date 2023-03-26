import { UpdateClientUseCase } from "@/domain/usecases/clients/update-client-usecase"
import {
	badRequest,
	noContent,
	ok,
	serverError,
} from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"
import { Validation } from "@/presentation/protocols/validation"

export class UpdateClientController implements Controller {
	constructor(
		private readonly updateClientUseCase: UpdateClientUseCase,
		private readonly updateClientValidation: Validation
	) {}

	execute: UpdateClientControllerProtocol = async (request) => {
		const errors = this.updateClientValidation.validate(request)
		if (errors) return badRequest(errors)

		try {
			const result = await this.updateClientUseCase.update(request!)

			if (result) return ok(result)
			return noContent()
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export type UpdateClientControllerProtocol = ControllerProtocol<
	UpdateClientUseCase.Params,
	UpdateClientUseCase.Result
>
