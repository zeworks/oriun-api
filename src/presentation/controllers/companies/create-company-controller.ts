import { CreateCompanyUseCase } from "@/domain/usecases/companies/create-company"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import { Controller } from "@/presentation/protocols/controller"
import { HttpResponse } from "@/presentation/protocols/http"
import { Validation } from "@/presentation/protocols/validation"

export namespace CreateCompanyController {
	export type Params = CreateCompanyUseCase.Params
	export type Result = CreateCompanyUseCase.Result
}

type CreateCompanyControllerFunction = (
	request: CreateCompanyController.Params
) => Promise<HttpResponse<CreateCompanyController.Result>>

export class CreateCompanyController implements Controller {
	constructor(
		private readonly createCompanyValidation: Validation,
		private readonly createCompany: CreateCompanyUseCase
	) {}

	execute: CreateCompanyControllerFunction = async (request) => {
		const errors = this.createCompanyValidation.validate(request)
		if (errors) return badRequest(errors)

		try {
			const result = await this.createCompany.create(request)
			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}
