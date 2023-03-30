import { CompanyCodeInvalidError } from "@/data/errors/companies-error"
import { LoadCompanyByCodeUseCase } from "@/domain/usecases/companies/load-company-by-code"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"
import { Validation } from "@/presentation/protocols/validation"

export class LoadCompanyByCodeController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly loadCompanyByCodeUseCase: LoadCompanyByCodeUseCase
	) {}

	execute: ControllerProtocol<
		LoadCompanyByCodeController.Params,
		LoadCompanyByCodeController.Result
	> = async (request) => {
		const errors = this.validation.validate(request)

		if (errors) return badRequest(errors)

		try {
			const result = await this.loadCompanyByCodeUseCase.loadByCode(
				request!.code
			)

			if (!result) throw new CompanyCodeInvalidError()

			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace LoadCompanyByCodeController {
	export type Params = {
		code: string
	}

	export type Result = LoadCompanyByCodeUseCase.Result
}
