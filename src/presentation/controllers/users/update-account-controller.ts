import { DbUpdateAccount } from "@/data/usecases/users/db-update-account"
import { UpdateAccountUseCase } from "@/domain/usecases/users/update-account"
import { MissingParamError } from "@/presentation/errors/missing-param-error"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"

export class UpdateAccountController implements Controller {
	constructor(private readonly dbUpdateAccount: DbUpdateAccount) {}

	execute: ControllerProtocol<
		UpdateAccountController.Input,
		UpdateAccountController.Result
	> = async (request) => {
		if (!request?.id) return badRequest(new MissingParamError("id"))
		try {
			const result = await this.dbUpdateAccount.update(
				request.id,
				request.input
			)
			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace UpdateAccountController {
	export type Input = {
		id: string
		input: UpdateAccountUseCase.Input
	}
	export type Result = UpdateAccountUseCase.Result
}
