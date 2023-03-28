import { DeleteClientUseCase } from "@/domain/usecases/clients/delete-client-usecase"
import { MissingParamError } from "@/presentation/errors/missing-param-error"
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

export class DeleteClientController implements Controller {
	constructor(private readonly deleteClientUseCase: DeleteClientUseCase) {}

	execute: DeleteClientControllerProtocol = async (request) => {
		if (!request?.id) return badRequest(new MissingParamError("id"))

		try {
			const result = await this.deleteClientUseCase.delete(request.id)
			if (result) return ok(result)
			return noContent()
		} catch (error: any) {
			return serverError(error)
		}
	}
}

type DeleteClientControllerProtocol = ControllerProtocol<
	{ id: string },
	DeleteClientUseCase.Result
>
