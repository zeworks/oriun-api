import { AccountContext } from "@/config/account-context"
import { LoadClientsUseCase } from "@/domain/usecases/clients/load-clients-usecase"
import { ok, serverError } from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"

export class LoadClientsController implements Controller {
	constructor(private readonly loadClientsUseCase: LoadClientsUseCase) {}

	execute: ControllerProtocol<
		LoadClientsController.Request,
		LoadClientsController.Result,
		AccountContext
	> = async (request, context) => {
		try {
			const result = await this.loadClientsUseCase.loadClients(request, context)
			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace LoadClientsController {
	export type Request = LoadClientsUseCase.Params
	export type Result = LoadClientsUseCase.Result
}
