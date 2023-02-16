import { DeleteAccountUseCase } from "@/domain/usecases/users/delete-account"
import { MissingParamError } from "@/presentation/errors/missing-param-error"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"

export class DeleteAccountController
	implements
		Controller<DeleteAccountController.Params, DeleteAccountController.Result>
{
	constructor(private readonly deleteAccount: DeleteAccountUseCase) {}

	execute: ControllerProtocol<
		DeleteAccountController.Params,
		DeleteAccountController.Result
	> = async (request) => {
		// if no user id sent
		if (!request?.id) {
			return badRequest(new MissingParamError("id"))
		}

		try {
			const result = await this.deleteAccount.delete(request.id)
			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace DeleteAccountController {
	export type Params = {
		id: string
	}

	export type Result = DeleteAccountUseCase.Result
}
