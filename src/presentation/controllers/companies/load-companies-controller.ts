import { LoadCompaniesUseCase } from "@/domain/usecases/companies/load-companies"
import { ok, serverError } from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"

export class LoadCompaniesController implements Controller {
	constructor(private readonly loadCompanies: LoadCompaniesUseCase) {}

	execute: ControllerProtocol<
		LoadCompaniesController.Params,
		LoadCompaniesController.Result
	> = async (request) => {
		try {
			const result = await this.loadCompanies.loadCompanies(request)
			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace LoadCompaniesController {
	export type Params = LoadCompaniesUseCase.Params
	export type Result = LoadCompaniesUseCase.Result
}
