import { LoadDepartmentByIdUseCase } from "@/domain/usecases/departments/load-department-by-id"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import { Controller } from "@/presentation/protocols/controller"
import { HttpResponse } from "@/presentation/protocols/http"
import { Validation } from "@/presentation/protocols/validation"

export class LoadDepartmentByIdController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly loadDepartmentById: LoadDepartmentByIdUseCase
	) {}

	async execute(
		request: LoadDepartmentByIdController.Params
	): Promise<HttpResponse<LoadDepartmentByIdController.Result>> {
		const errors = this.validation.validate(request)

		if (errors) return badRequest(errors)

		try {
			const result = await this.loadDepartmentById.loadById(request?.id)
			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace LoadDepartmentByIdController {
	export type Params = {
		id: string
	}

	export type Result = LoadDepartmentByIdUseCase.Result
}
