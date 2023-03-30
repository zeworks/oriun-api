import { DbUpdateCompany } from "@/data/usecases/companies/db-update-company"
import { UpdateCompanyUseCase } from "@/domain/usecases/companies/update-company"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"
import { Validation } from "@/presentation/protocols/validation"

export class UpdateCompanyController implements Controller {
	constructor(
		private readonly updateCompanyValidation: Validation,
		private readonly updateCompanyUseCase: DbUpdateCompany
	) {}

	execute: ControllerProtocol<
		UpdateCompanyController.Params,
		UpdateCompanyController.Result
	> = async (request) => {
		const errors = this.updateCompanyValidation.validate(request)
		if (errors) return badRequest(errors)

		try {
			const result = await this.updateCompanyUseCase.update(request!)
			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace UpdateCompanyController {
	export type Params = UpdateCompanyUseCase.Params
	export type Result = UpdateCompanyUseCase.Result
}
