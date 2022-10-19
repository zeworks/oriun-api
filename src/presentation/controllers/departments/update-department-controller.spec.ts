import { InMemoryDepartmentsRepository } from "@/data/protocols/repositories/departments/in-memory-departments-repository";
import { DbCreateDepartment } from "@/data/usecases/departments/create-department";
import { DbUpdateDepartment } from "@/data/usecases/departments/update-department";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { makeCreateDepartmentValidation } from "@/main/factories/controllers/departments/create-department-controller-validation";
import { makeUpdateDepartmentValidation } from "@/main/factories/controllers/departments/update-department-controller-validation";
import { MissingParamError } from "@/presentation/errors/missing-param-error";
import { expect, test } from "vitest";
import { CreateDepartmentController } from "./create-department-controller";
import { UpdateDepartmentController } from "./update-department-controller";

const departmentsRepository = new InMemoryDepartmentsRepository();
const uuidAdapter = new UuidAdapter();

test("Should update department name with success", async () => {

  const createDepartmentUseCase = new DbCreateDepartment(uuidAdapter, departmentsRepository, departmentsRepository)
  const createDepartment = new CreateDepartmentController(makeCreateDepartmentValidation(), createDepartmentUseCase)

  const updateDepartmentUseCase = new DbUpdateDepartment(departmentsRepository, departmentsRepository, departmentsRepository);
  const updateDepartment = new UpdateDepartmentController(makeUpdateDepartmentValidation(), updateDepartmentUseCase);

  const departmentCreated = await createDepartment.execute({
    name: "John Doe",
    status: false
  })

  if (departmentCreated.data?.id) {
    const departmentUpdated = await updateDepartment.execute({
      id: departmentCreated.data?.id,
      input: {
        name: "Jose"
      }
    })

    expect(departmentUpdated.data?.id).toEqual(departmentCreated.data.id);
    expect(departmentUpdated.data?.name).toEqual("Jose");
    expect(departmentUpdated.data?.updatedAt).not.toBeUndefined();
    expect(departmentUpdated.data?.createdAt).toEqual(departmentCreated.data.createdAt);
  }
})

test("Should throw an error if trying to update an invalid department id", async () => {
  const updateDepartmentUseCase = new DbUpdateDepartment(departmentsRepository, departmentsRepository, departmentsRepository);
  const updateDepartment = new UpdateDepartmentController(makeUpdateDepartmentValidation(), updateDepartmentUseCase);
  const result = await updateDepartment.execute({
    id: "123",
    input: {
      name: "Jose"
    }
  })

  expect(result.data).toEqual(new Error("department id invalid"));
})

test("Should throw an error if trying to update a department without id", async () => {
  const updateDepartmentUseCase = new DbUpdateDepartment(departmentsRepository, departmentsRepository, departmentsRepository);
  const updateDepartment = new UpdateDepartmentController(makeUpdateDepartmentValidation(), updateDepartmentUseCase);
  const result = await updateDepartment.execute({
    id: "",
    input: {
      name: "Jose"
    }
  })

  expect(result.data).toEqual(new MissingParamError("id"));
})
