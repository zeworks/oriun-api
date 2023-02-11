import { LoadAccountByIdUseCase } from "@/domain/usecases/users/load-account-by-id"
import { MissingParamError } from "@/presentation/errors/missing-param-error"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"

export class LoadAccountByIdController implements Controller {
	constructor(private readonly loadAccountById: LoadAccountByIdUseCase) {}

	execute: ControllerProtocol<
		Partial<{ id?: string }>,
		LoadAccountByIdUseCase.Result,
		any
	> = async (req, context) => {
		if (!context?.accountId && !req?.id)
			return badRequest(new MissingParamError("authorization"))

		try {
			const result = await this.loadAccountById.loadById(
				req?.id || context?.accountId
			)

			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}
