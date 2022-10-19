import { InMemoryDepartmentsRepository } from "@/data/protocols/repositories/departments/in-memory-departments-repository";
import { DbCreateDepartment } from "@/data/usecases/departments/create-department";
import { DbDeleteDepartment } from "@/data/usecases/departments/delete-department";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { makeCreateDepartmentValidation } from "@/main/factories/controllers/departments/create-department-controller-validation";
import { makeDeleteDepartmentValidation } from "@/main/factories/controllers/departments/delete-department-controller-validation";
import { MissingParamError } from "@/presentation/errors/missing-param-error";
import { expect, test } from "vitest";
import { CreateDepartmentController } from "./create-department-controller";
import { DeleteDepartmentController } from "./delete-department-controller";

const uuidAdapter = new UuidAdapter();

test("Should delete department with success", async () => {
  
  const departmentsRepository = new InMemoryDepartmentsRepository();
  const createDepartmentUseCase = new DbCreateDepartment(uuidAdapter, departmentsRepository, departmentsRepository)
  const createDepartment = new CreateDepartmentController(makeCreateDepartmentValidation(), createDepartmentUseCase);

  const deleteDepartmentUseCase = new DbDeleteDepartment(departmentsRepository, departmentsRepository);
  const deleteDepartment = new DeleteDepartmentController(makeDeleteDepartmentValidation(), deleteDepartmentUseCase);

  const department = await createDepartment.execute({
    name: "Department Name",
    status: true,
  })

  if (department.data?.id) {
    const result = await deleteDepartment.execute({
      id: department.data?.id
    })

    expect(result.data).toEqual(true);
  }
})

test("Should throw an error if trying to delete an invalid department id", async () => {

  const departmentsRepository = new InMemoryDepartmentsRepository();

  const deleteDepartmentUseCase = new DbDeleteDepartment(departmentsRepository, departmentsRepository);
  const deleteDepartment = new DeleteDepartmentController(makeDeleteDepartmentValidation(), deleteDepartmentUseCase);

  const result = await deleteDepartment.execute({
    id: "123"
  })

  expect(result.data).toEqual(new Error("department id invalid"));
})

test("Should throw an error if trying to delete without send id", async () => {

  const departmentsRepository = new InMemoryDepartmentsRepository();

  const deleteDepartmentUseCase = new DbDeleteDepartment(departmentsRepository, departmentsRepository);
  const deleteDepartment = new DeleteDepartmentController(makeDeleteDepartmentValidation(), deleteDepartmentUseCase);

  const result = await deleteDepartment.execute({
    id: ""
  })

  expect(result.data).toEqual(new MissingParamError("id"));
})
