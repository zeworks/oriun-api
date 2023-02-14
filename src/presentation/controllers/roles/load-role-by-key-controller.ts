import { LoadRoleByKeyUseCase } from "@/domain/usecases/roles/load-role-by-key"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import { Controller } from "@/presentation/protocols/controller"
import { HttpResponse } from "@/presentation/protocols/http"
import { Validation } from "@/presentation/protocols/validation"

export class LoadRoleByKeyController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly loadRole: LoadRoleByKeyUseCase
	) {}

	async execute(
		request: LoadRoleByKeyController.Params
	): Promise<HttpResponse<LoadRoleByKeyController.Result>> {
		const errors = this.validation.validate(request)

		if (errors) return badRequest(errors)

		try {
			const result = await this.loadRole.loadByKey(request.key)
			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace LoadRoleByKeyController {
	export type Params = {
		key: string
	}

	export type Result = LoadRoleByKeyUseCase.Result
}
