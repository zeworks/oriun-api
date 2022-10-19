import { InMemoryDepartmentsRepository } from "@/data/protocols/repositories/departments/in-memory-departments-repository";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { v4 } from "uuid";
import { expect, test } from "vitest";
import { DbCreateDepartment } from "./create-department";
import { DbLoadDepartmentById } from "./load-department-by-id";

const departmentsRepository = new InMemoryDepartmentsRepository();

const createDepartment = () => {
  const uuidAdapter = new UuidAdapter()
  return new DbCreateDepartment(uuidAdapter, departmentsRepository, departmentsRepository);
}

const loadDepartmentById = () => {
  return new DbLoadDepartmentById(departmentsRepository);
}

test("load department by id with success", async () => {
  const firstData = await createDepartment().create({
    id: v4(),
    name: "Department Name 1",
    status: false
  })

  const secondData = await createDepartment().create({
    id: v4(),
    name: "Department Name 2",
    status: true
  })

  const firstDepartment = await loadDepartmentById().loadById(firstData?.id!);
  const secondDepartment = await loadDepartmentById().loadById(secondData?.id!);

  expect(secondDepartment?.name).toEqual("Department Name 2");
  expect(firstDepartment?.name).toEqual("Department Name 1");
  expect(firstDepartment?.status).toEqual(false);
  expect(secondDepartment?.status).toEqual(true);
})

test("Should throw an error on load department id invalid", async () => {
  expect(loadDepartmentById().loadById("invalid id")).rejects.toThrow(new Error("department id invalid"));
})
