import { InMemoryDepartmentsRepository } from "@/data/protocols/repositories/departments/in-memory-departments-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { v4 } from "uuid"
import { expect, test } from "vitest"
import { DbCreateDepartment } from "./create-department"
import { DbLoadDepartmentByName } from "./load-department-by-name"

const departmentsRepository = new InMemoryDepartmentsRepository()

const createDepartment = () => {
	const uuidAdapter = new UuidAdapter()
	return new DbCreateDepartment(
		uuidAdapter,
		departmentsRepository,
		departmentsRepository
	)
}

const loadDepartmentByName = () => {
	return new DbLoadDepartmentByName(departmentsRepository)
}

test("load department by name with success", async () => {
	await createDepartment().create({
		id: v4(),
		name: "Department Name 1",
		status: false,
	})

	await createDepartment().create({
		id: v4(),
		name: "Department Name 2",
		status: true,
	})

	const firstDepartment = await loadDepartmentByName().loadByName(
		"Department Name 1"
	)
	const secondDepartment = await loadDepartmentByName().loadByName(
		"Department Name 2"
	)

	expect(secondDepartment?.name).toEqual("Department Name 2")
	expect(firstDepartment?.name).toEqual("Department Name 1")
	expect(firstDepartment?.status).toEqual(false)
	expect(secondDepartment?.status).toEqual(true)
})

test("Should throw an error on load department name invalid", async () => {
	expect(loadDepartmentByName().loadByName("invalid name")).rejects.toThrow(
		new Error("department name invalid")
	)
})
