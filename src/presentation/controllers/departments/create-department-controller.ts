import { CreateDepartmentUseCase } from "@/domain/usecases/departments/create-department"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import { Controller } from "@/presentation/protocols/controller"
import { HttpResponse } from "@/presentation/protocols/http"
import { Validation } from "@/presentation/protocols/validation"

export class CreateDepartmentController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly createDepartment: CreateDepartmentUseCase
	) {}

	execute = async (
		request: CreateDepartmentController.Params
	): Promise<HttpResponse<CreateDepartmentController.Result>> => {
		const errors = this.validation.validate(request)

		if (errors) return badRequest(errors)

		try {
			const data = await this.createDepartment.create(request)
			return ok(data)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace CreateDepartmentController {
	export type Params = {
		name: string
		status: boolean
	}

	export type Result = CreateDepartmentUseCase.Result
}
