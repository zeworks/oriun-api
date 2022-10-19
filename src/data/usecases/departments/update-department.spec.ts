import { InMemoryDepartmentsRepository } from "@/data/protocols/repositories/departments/in-memory-departments-repository";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { v4 } from "uuid";
import { expect, test } from "vitest";
import { DbCreateDepartment } from "./create-department";
import { DbUpdateDepartment } from "./update-department";

test("Should update department name with success", async () => {
  const departmentsRepository = new InMemoryDepartmentsRepository()

  const createDepartment = () => {
    const uuidAdapter = new UuidAdapter()
    return new DbCreateDepartment(uuidAdapter, departmentsRepository, departmentsRepository);
  }

  const department = await createDepartment().create({
    id: v4(),
    name: "Department Name 1",
    status: true
  })

  const data = await new DbUpdateDepartment(departmentsRepository, departmentsRepository, departmentsRepository).update({
    id: department?.id!,
    name: "Department Name Updated"
  })

  expect(data?.id).toEqual(department?.id);
  expect(data?.name).toEqual("Department Name Updated");
  expect(data?.status).toEqual(true);
})

test("Should throw an error if trying to update an invalid department", async () => {
  const departmentsRepository = new InMemoryDepartmentsRepository()

  expect(new DbUpdateDepartment(departmentsRepository, departmentsRepository, departmentsRepository).update({
    id: "123",
    name: "Department Name Updated"
  })).rejects.toThrow(new Error("department id invalid"))
})
