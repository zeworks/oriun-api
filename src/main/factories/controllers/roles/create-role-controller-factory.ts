import { UuidAdapter } from "@/infra/cryptography/uuid"
import { CreateRoleController } from "@/presentation/controllers/roles/create-role-controller"
import { Controller } from "@/presentation/protocols/controller"
import { makeDbCreateRoleUseCase } from "../../usecases/roles/create-role-usecase-factory"
import { makeCreateRoleValidation } from "./create-role-validation-factory"

export const makeCreateRoleController = (): Controller => {
	const uuidAdapter = new UuidAdapter()
	return new CreateRoleController(
		uuidAdapter,
		makeCreateRoleValidation(),
		makeDbCreateRoleUseCase()
	)
}
