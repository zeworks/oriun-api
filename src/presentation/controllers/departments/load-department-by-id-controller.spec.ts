import { InMemoryDepartmentsRepository } from "@/data/protocols/repositories/departments/in-memory-departments-repository"
import { DbCreateDepartment } from "@/data/usecases/departments/create-department"
import { DbLoadDepartmentById } from "@/data/usecases/departments/load-department-by-id"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateDepartmentValidation } from "@/main/factories/controllers/departments/create-department-controller-validation"
import { makeLoadDepartmentByIdValidation } from "@/main/factories/controllers/departments/load-department-by-id-controller-validation"
import { MissingParamError } from "@/presentation/errors/missing-param-error"
import { expect, test } from "vitest"
import { CreateDepartmentController } from "./create-department-controller"
import { LoadDepartmentByIdController } from "./load-department-by-id-controller"

test("Should load a department by id with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const departmentsRepository = new InMemoryDepartmentsRepository()
	const createDepartmentUseCase = new DbCreateDepartment(
		uuidAdapter,
		departmentsRepository,
		departmentsRepository
	)
	const createDepartment = new CreateDepartmentController(
		makeCreateDepartmentValidation(),
		createDepartmentUseCase
	)

	const department = await createDepartment.execute({
		name: "Department Name",
		status: true,
	})

	const loadDepartmentByIdUseCase = new DbLoadDepartmentById(
		departmentsRepository
	)
	const loadDepartmentByIdController = new LoadDepartmentByIdController(
		makeLoadDepartmentByIdValidation(),
		loadDepartmentByIdUseCase
	)

	const result = await loadDepartmentByIdController.execute({
		id: department.data!.id,
	})

	expect(result.data?.id).toEqual(department.data?.id)
})

test("Should throw an error if invalid department id given", async () => {
	const departmentsRepository = new InMemoryDepartmentsRepository()
	const loadDepartmentByIdUseCase = new DbLoadDepartmentById(
		departmentsRepository
	)
	const loadDepartmentByIdController = new LoadDepartmentByIdController(
		makeLoadDepartmentByIdValidation(),
		loadDepartmentByIdUseCase
	)

	const result = await loadDepartmentByIdController.execute({ id: "123" })

	expect(result.data).toBeInstanceOf(Error)
	expect(result.data).toEqual(new Error("department id invalid"))
})

test("Should throw an error if id undefined", async () => {
	const departmentsRepository = new InMemoryDepartmentsRepository()
	const loadDepartmentByIdUseCase = new DbLoadDepartmentById(
		departmentsRepository
	)
	const loadDepartmentByIdController = new LoadDepartmentByIdController(
		makeLoadDepartmentByIdValidation(),
		loadDepartmentByIdUseCase
	)

	const result = await loadDepartmentByIdController.execute({ id: "" })
	expect(result.data).toBeInstanceOf(Error)
	expect(result.data).toEqual(new MissingParamError("id"))
})
