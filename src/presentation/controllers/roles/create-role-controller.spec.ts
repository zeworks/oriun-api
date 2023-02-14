import { test, expect } from "vitest"
import { KeyInUseError } from "@/data/errors/key-in-use-error"
import { InMemoryRolesRepository } from "@/data/protocols/repositories/roles/roles-repository-memory"
import { DbCreateRole } from "@/data/usecases/roles/create-role-usecase"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateRoleValidation } from "@/main/factories/controllers/roles/create-role-validation-factory"
import { Controller } from "@/presentation/protocols/controller"
import { CreateRoleController } from "./create-role-controller"

const rolesRepository = new InMemoryRolesRepository()

const makeCreateRoleController = (): Controller => {
	const uuidAdapter = new UuidAdapter()
	const createRoleUseCase = new DbCreateRole(rolesRepository, rolesRepository)
	return new CreateRoleController(
		uuidAdapter,
		makeCreateRoleValidation(),
		createRoleUseCase
	)
}

test("Should create role with success", async () => {
	const data = await makeCreateRoleController().execute({
		key: "role_key",
		name: "nome role",
		status: false,
	})

	expect(data.data.name).toBe("nome role")
	expect(data.data.status).toBe(false)
	expect(data.data.key).toBe("role_key")
})

test("Should throw an error if duplicated key", async () => {
	await makeCreateRoleController().execute({
		key: "role_key_1",
		name: "nome role",
		status: false,
	})

	const result = await makeCreateRoleController().execute({
		key: "role_key_1",
		name: "nome role",
		status: false,
	})

	expect(result.data).toEqual(new KeyInUseError("role_key_1"))
})
