import { DbCreateRole } from "@/data/usecases/roles/create-role-usecase"
import { CreateRoleUseCase } from "@/domain/usecases/roles/create-role"
import { RolesRepository } from "@/infra/db/prisma/repos/roles-repository"
import { makeDbCheckRoleByKeyUseCase } from "./check-role-by-key-usecase-factory"

export const makeDbCreateRoleUseCase = (): CreateRoleUseCase => {
	const createRoleRepository = new RolesRepository()
	return new DbCreateRole(makeDbCheckRoleByKeyUseCase(), createRoleRepository)
}
