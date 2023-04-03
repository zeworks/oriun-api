import { AccountContext } from "@/config/account-context"
import { DeleteAuthenticationUseCase } from "@/domain/usecases/authentication/delete-authentication"
import {
	noContent,
	ok,
	serverError,
	unauthorized,
} from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"

export class DeleteAuthenticationController implements Controller {
	constructor(
		private readonly deleteAuthenticationUseCase: DeleteAuthenticationUseCase
	) {}

	execute: ControllerProtocol<
		any,
		DeleteAuthenticationUseCase.Result,
		AccountContext
	> = async (request, context) => {
		if (!context?.accountId) return unauthorized()

		try {
			const result = await this.deleteAuthenticationUseCase.deleteToken(
				context.accountId
			)

			if (result) return ok(result)
			return noContent()
		} catch (error: any) {
			return serverError(error)
		}
	}
}
