import { InMemoryDepartmentsRepository } from "@/data/protocols/repositories/departments/in-memory-departments-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { v4 } from "uuid"
import { expect, test } from "vitest"
import { DbCreateDepartment } from "./create-department"
import { DbDeleteDepartment } from "./delete-department"

test("Should delete department with success", async () => {
	const departmentsRepository = new InMemoryDepartmentsRepository()

	const createDepartment = () => {
		const uuidAdapter = new UuidAdapter()
		return new DbCreateDepartment(
			uuidAdapter,
			departmentsRepository,
			departmentsRepository
		)
	}

	const department = await createDepartment().create({
		id: v4(),
		name: "Department",
		status: true,
	})

	const result = await new DbDeleteDepartment(
		departmentsRepository,
		departmentsRepository
	).delete(department?.id!)

	expect(result).toEqual(true)
})

test("Should throw an error if trying to delete an invalid department id", async () => {
	const departmentsRepository = new InMemoryDepartmentsRepository()
	expect(
		new DbDeleteDepartment(departmentsRepository, departmentsRepository).delete(
			"123"
		)
	).rejects.toThrow(new Error("department id invalid"))
})
