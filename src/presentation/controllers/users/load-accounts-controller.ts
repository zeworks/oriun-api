import { LoadAccountsUseCase } from "@/domain/usecases/users/load-accounts"
import { ok, serverError } from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"

export class LoadAccountsController implements Controller {
	constructor(private readonly loadAccountsUseCase: LoadAccountsUseCase) {}

	execute: ControllerProtocol<any, LoadAccountsUseCase.Result, any> =
		async () => {
			try {
				const accounts = await this.loadAccountsUseCase.loadAccounts()
				return ok(accounts || [])
			} catch (error: any) {
				return serverError(error)
			}
		}
}
