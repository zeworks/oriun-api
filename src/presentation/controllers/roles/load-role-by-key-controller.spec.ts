import { InMemoryRolesRepository } from "@/data/protocols/repositories/roles/roles-repository-memory"
import { DbCreateRole } from "@/data/usecases/roles/create-role-usecase"
import { DbLoadRoleByKey } from "@/data/usecases/roles/db-load-role-by-key-usecase"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateRoleValidation } from "@/main/factories/controllers/roles/create-role-validation-factory"
import { makeLoadRoleByKeyValidation } from "@/main/factories/controllers/roles/load-role-by-key-validation"
import { expect, test } from "vitest"
import { CreateRoleController } from "./create-role-controller"
import { LoadRoleByKeyController } from "./load-role-by-key-controller"

test("Should load role by key with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const rolesRepository = new InMemoryRolesRepository()
	const dbCreateRole = new DbCreateRole(rolesRepository, rolesRepository)
	const createRole = new CreateRoleController(
		uuidAdapter,
		makeCreateRoleValidation(),
		dbCreateRole
	)

	const dbLoadRole = new DbLoadRoleByKey(rolesRepository)
	const loadRoleController = new LoadRoleByKeyController(
		makeLoadRoleByKeyValidation(),
		dbLoadRole
	)

	const role = await createRole.execute({
		key: "admin",
		name: "admin role",
		status: true,
	})

	if (role.data) {
		const result = await loadRoleController.execute({
			key: role.data?.key,
		})

		expect(result.data?.key).toEqual("admin")
	}
})
