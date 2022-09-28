import { CreatePermissionUseCase } from "./create-permission";
import {v4 as uuid} from "uuid"

describe('[USE CASE] Create Permission', () => {
  let permissions: any[] = [];

  const create: CreatePermissionUseCase = async (input) => {

    if (permissions.find(p => p.key === input.key))
      throw new Error("permission already exists")
    
    permissions.push(input);
    
    if (!input.key)
      throw new Error("key missing");

    if (!input.name)
      throw new Error("name missing");
    
    if (!input.status)
      throw new Error("status missing")
    
    return Promise.resolve({
      ...input,
      createdAt: new Date().toISOString(),
    })
  }

  it('Should create permission', async () => {
    const data = await create({
      name: "Create Permission",
      status: true,
      id: uuid(),
      key: "create_permission",
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
        id: uuid(),
        key: "create_permission_1",
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
        id: uuid(),
        key: "create_permission_2",
        parent: "permission"
      })
    } catch (error) {
      expect(error).toEqual(new Error("status missing"))
    }
  });
})
