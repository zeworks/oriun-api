import { CreatePermissionUseCase } from "./create-permission";
import {v4 as uuid} from "uuid"

describe('[USE CASE] Create Permission', () => {
  const create: CreatePermissionUseCase = async (input) => {

    if (!input.name)
      throw new Error("name missing");
    
    if (!input.status)
      throw new Error("status missing")
    
    return Promise.resolve({
      ...input,
      id: uuid(),
      createdAt: new Date().toISOString(),
    })
  }

  it('Should create permission', async () => {
    const data = await create({
      name: "Create Permission",
      status: true,
      parent: "permission"
    });

    expect(data?.name).toBe("Create Permission");
    expect(data?.status).toBeTruthy();
    expect(data?.parent).toBe("permission");
  });

  it('Should not create permission if empty name', async () => {
    try {
      await create({
        name: "",
        status: true,
        parent: "permission"
      })
    } catch (error) {
      expect(error).toEqual(new Error("name missing"))
    }
  });

  it('Should not create permission if undefined status', async () => {
    try {
      await create({
        name: "name",
        status: undefined as any,
        parent: "permission"
      })
    } catch (error) {
      expect(error).toEqual(new Error("status missing"))
    }
  });
})
