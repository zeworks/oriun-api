import { InMemoryDepartmentsRepository } from "@/data/protocols/repositories/departments/in-memory-departments-repository";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { v4 } from "uuid";
import { expect, test } from "vitest";
import { DbCreateDepartment } from "./create-department";
import { DbLoadDepartments } from "./load-departments";

test("Should load all departments", async () => {

  const departmentsRepository = new InMemoryDepartmentsRepository()

  const createDepartment = () => {
    const uuidAdapter = new UuidAdapter()
    return new DbCreateDepartment(uuidAdapter, departmentsRepository, departmentsRepository);
  }

  const loadDepartments = () => {
    return new DbLoadDepartments(departmentsRepository);
  }

  await createDepartment().create({
    id: v4(),
    name: "Department Name 1",
    status: true
  })

  await createDepartment().create({
    id: v4(),
    name: "Department Name 2",
    status: false
  })

  await createDepartment().create({
    id: v4(),
    name: "Department Name 3",
    status: true
  })

  const data = await loadDepartments().loadDepartments();
  
  expect(data.length).toEqual(3);
  expect(data[1].status).toEqual(false);
  expect(data[0].status).toEqual(true);
  expect(data[0].name).toEqual("Department Name 1");
  expect(data[2].status).toEqual(true);
})

test("Should return empty array if no departments created", async () => {

  const departmentsRepository = new InMemoryDepartmentsRepository()

  const loadDepartments = () => {
    return new DbLoadDepartments(departmentsRepository);
  }

  const data = await loadDepartments().loadDepartments();
  expect(data.length).toEqual(0);
  expect(data).toEqual([]);
})
