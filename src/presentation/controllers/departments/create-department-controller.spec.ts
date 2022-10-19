import { InMemoryDepartmentsRepository } from "@/data/protocols/repositories/departments/in-memory-departments-repository";
import { DbCreateDepartment } from "@/data/usecases/departments/create-department";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { makeCreateDepartmentValidation } from "@/main/factories/controllers/departments/create-department-controller-validation";
import { MissingParamError } from "@/presentation/errors/missing-param-error";
import { expect, test } from "vitest";
import { CreateDepartmentController } from "./create-department-controller";

const departmentsRepository = new InMemoryDepartmentsRepository();
const uuidAdapter = new UuidAdapter();

test("Should create department with success", async () => {
  const createDepartmentUseCase = new DbCreateDepartment(uuidAdapter, departmentsRepository, departmentsRepository)
  const createDepartment = new CreateDepartmentController(makeCreateDepartmentValidation(), createDepartmentUseCase)

  const result = await createDepartment.execute({
    name: "John Doe",
    status: false
  })

  expect(createDepartment).toBeInstanceOf(CreateDepartmentController)
  expect(result.data?.id).not.toBeUndefined()
  expect(result.data?.createdAt).not.toBeUndefined()
  expect(result.data?.updatedAt).toBeUndefined()
  expect(result.data?.name).toBe("John Doe")
  expect(result.data?.status).toBe(false);
})

test("Should throw an error if empty name", async () => {
  const createDepartmentUseCase = new DbCreateDepartment(uuidAdapter, departmentsRepository, departmentsRepository)
  const createDepartment = new CreateDepartmentController(makeCreateDepartmentValidation(), createDepartmentUseCase)

  const result = await createDepartment.execute({
    name: "",
    status: false
  })

  expect(createDepartment).toBeInstanceOf(CreateDepartmentController)
  expect(result.data).toEqual(new MissingParamError("name"));
})

test("Should throw an error if undefined status", async () => {
  const createDepartmentUseCase = new DbCreateDepartment(uuidAdapter, departmentsRepository, departmentsRepository)
  const createDepartment = new CreateDepartmentController(makeCreateDepartmentValidation(), createDepartmentUseCase)

  const result = await createDepartment.execute({
    name: "John Doe",
  } as any)

  expect(createDepartment).toBeInstanceOf(CreateDepartmentController)
  expect(result.data).toEqual(new MissingParamError("status"));
})
