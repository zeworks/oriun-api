import { CreateRoleUseCase } from "@/domain/usecases/roles/create-role"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import { Controller } from "@/presentation/protocols/controller"
import { HttpResponse } from "@/presentation/protocols/http"
import { Validation } from "@/presentation/protocols/validation"

export class CreateRoleController implements Controller {
	constructor(
		private readonly uuidAdapter: UuidAdapter,
		private readonly validation: Validation,
		private readonly createRole: CreateRoleUseCase
	) {}

	execute = async (
		request: CreateRoleController.Request
	): Promise<HttpResponse<CreateRoleController.Result>> => {
		try {
			const validationError = this.validation.validate(request)

			if (validationError) return badRequest(validationError)

			const id = await this.uuidAdapter.generate()

			const result = await this.createRole.create({
				...request,
				id,
			})

			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace CreateRoleController {
	export type Request = {
		name: string
		key: string
		status?: boolean
	}

	export type Result = CreateRoleUseCase.Result
}
