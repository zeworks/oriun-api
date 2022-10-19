import { NameInUseError } from "@/data/errors/name-in-use-error";
import { InMemoryDepartmentsRepository } from "@/data/protocols/repositories/departments/in-memory-departments-repository";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { v4 } from "uuid";
import { describe, expect, test } from "vitest";
import { DbCreateDepartment } from "./create-department";

describe("[use case] create department", () => {

  test("Create department with success", async () => {
    const uuidAdapter = new UuidAdapter()
    const departmentsRepository = new InMemoryDepartmentsRepository();
    const createDepartment = new DbCreateDepartment(uuidAdapter, departmentsRepository, departmentsRepository);

    const data = await createDepartment.create({
      id: v4(),
      name: "Department Name",
      status: false
    })

    expect(data?.name).toEqual("Department Name");
    expect(data?.status).toEqual(false);
    expect(data?.createdAt).not.toBeUndefined()
  })

  test("Error on create deparment if name already exists", async () => {
    const uuidAdapter = new UuidAdapter()
    const departmentsRepository = new InMemoryDepartmentsRepository();
    const createDepartment = new DbCreateDepartment(uuidAdapter, departmentsRepository, departmentsRepository);

    await createDepartment.create({
      id: v4(),
      name: "Department Name",
      status: false
    })

    expect(createDepartment.create({
      id: v4(),
      name: "Department Name",
      status: false
    })).rejects.toThrow(new NameInUseError())
  })
})
