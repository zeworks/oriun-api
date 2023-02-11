import { LoadRoleByKeyController } from "@/presentation/controllers/roles/load-role-by-key-controller"
import { Controller } from "@/presentation/protocols/controller"
import { makeLoadRoleByKeyUseCase } from "../../usecases/roles/load-role-by-key-usecase-factory"
import { makeLoadRoleByKeyValidation } from "./load-role-by-key-validation"

export const makeLoadRoleByKeyController = (): Controller => {
	return new LoadRoleByKeyController(
		makeLoadRoleByKeyValidation(),
		makeLoadRoleByKeyUseCase()
	)
}
