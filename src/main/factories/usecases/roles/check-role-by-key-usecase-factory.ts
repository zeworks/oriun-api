import { DbCheckRoleByKey } from "@/data/usecases/roles/check-role-by-key-usecase"
import { CheckRoleByKeyUseCase } from "@/domain/usecases/roles/check-role-by-key"
import { RolesRepository } from "@/infra/db/prisma/repos/roles-repository"

export const makeDbCheckRoleByKeyUseCase = (): CheckRoleByKeyUseCase => {
	const repository = new RolesRepository()
	return new DbCheckRoleByKey(repository)
}
