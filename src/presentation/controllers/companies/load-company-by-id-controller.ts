import { LoadCompanyByIdUseCase } from "@/domain/usecases/companies/load-company-by-id"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"
import { Validation } from "@/presentation/protocols/validation"

export class LoadCompanyByIdController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly loadCompany: LoadCompanyByIdUseCase
	) {}

	execute: ControllerProtocol<
		LoadCompanyByIdController.Params,
		LoadCompanyByIdController.Result
	> = async (request) => {
		const errors = this.validation.validate(request)

		if (errors) return badRequest(errors)

		try {
			const result = await this.loadCompany.loadById(request?.id!)
			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace LoadCompanyByIdController {
	export type Params = {
		id: string
	}

	export type Result = LoadCompanyByIdUseCase.Result
}
