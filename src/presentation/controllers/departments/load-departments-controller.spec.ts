import { InMemoryDepartmentsRepository } from "@/data/protocols/repositories/departments/in-memory-departments-repository";
import { DbCreateDepartment } from "@/data/usecases/departments/create-department";
import { DbLoadDepartments } from "@/data/usecases/departments/load-departments";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { makeCreateDepartmentValidation } from "@/main/factories/controllers/departments/create-department-controller-validation";
import { expect, test } from "vitest";
import { CreateDepartmentController } from "./create-department-controller";
import { LoadDepartmentsController } from "./load-departments-controller";
  
const departmentsRepository = new InMemoryDepartmentsRepository();
const uuidAdapter = new UuidAdapter();

test("Should load list of departments with success", async () => {
  const createDepartmentUseCase = new DbCreateDepartment(uuidAdapter, departmentsRepository, departmentsRepository)
  const createDepartment = new CreateDepartmentController(makeCreateDepartmentValidation(), createDepartmentUseCase)

  const loadDepartmentsUseCase = new DbLoadDepartments(departmentsRepository);
  const loadDepartments = new LoadDepartmentsController(loadDepartmentsUseCase);

  await createDepartment.execute({
    name: "John Doe",
    status: false
  })

  await createDepartment.execute({
    name: "John Doe 2",
    status: false
  })

  const result = await loadDepartments.execute();
  expect(result.data.length).toEqual(2);
})
