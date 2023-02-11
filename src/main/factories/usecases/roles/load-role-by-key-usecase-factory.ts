import { DbLoadRoleByKey } from "@/data/usecases/roles/db-load-role-by-key-usecase"
import { LoadRoleByKeyUseCase } from "@/domain/usecases/roles/load-role-by-key"
import { RolesRepository } from "@/infra/db/prisma/repos/roles-repository"

export const makeLoadRoleByKeyUseCase = (): LoadRoleByKeyUseCase => {
	const rolesRepository = new RolesRepository()
	return new DbLoadRoleByKey(rolesRepository)
}
