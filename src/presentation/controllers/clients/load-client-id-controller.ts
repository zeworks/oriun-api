import { ClientInvalidError } from "@/data/errors/clients-error"
import { LoadClientByIdUseCase } from "@/domain/usecases/clients/load-client-by-id-usecase"
import { MissingParamError } from "@/presentation/errors/missing-param-error"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"

export class LoadClientByIdController implements Controller {
	constructor(private readonly loadClientByIdUseCase: LoadClientByIdUseCase) {}
	execute: ControllerProtocol<{ id: string }, LoadClientByIdUseCase.Result> =
		async (request) => {
			if (!request?.id) return badRequest(new MissingParamError("id"))

			try {
				const result = await this.loadClientByIdUseCase.loadById(request.id)
				if (result) return ok(result)
				return badRequest(new ClientInvalidError())
			} catch (error: any) {
				return serverError(error)
			}
		}
}
