import { LoadAccountByIdUseCase } from "@/domain/usecases/users/load-account-by-id"
import { MissingParamError } from "@/presentation/errors/missing-param-error"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"

export class LoadAccountByContextIdController implements Controller {
	constructor(private readonly loadAccountById: LoadAccountByIdUseCase) {}

	execute: ControllerProtocol<any, LoadAccountByIdUseCase.Result, any> = async (
		_,
		context
	) => {
		if (!context?.accountId) return badRequest(new MissingParamError("id"))

		try {
			const result = await this.loadAccountById.loadById(context?.accountId)

			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}
