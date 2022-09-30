import { v4 } from "uuid";
import { RolesEntity } from "../../entities/roles";
import { CreateRoleUseCase } from "./create-role"

describe('[USE CASE] Create Role', () => {

  const roles: RolesEntity[] = [];

  const create: CreateRoleUseCase = async (input) => {

    if (roles.find(r => r.key === input.key))
      throw new Error("duplicated key")

    if (!input.id)
      throw new Error("id missing");
    
    if (!input.key)
      throw new Error("key missing");
    
    if (!input.name)
      throw new Error("name missing");
    
    const data = {
      ...input,
      createAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    roles.push(data);

    return Promise.resolve(data);
  }

  it('Should create a new role with success', async () => {
    const permission = {
      id: v4(),
      key: "permission_one",
      name: "Permission One",
      status: true,
      parent: "Permission"
    }

    const role = await create({
      id: v4(),
      key: "admin",
      name: "Admin",
      status: true,
      permissions: [permission]
    });

    expect(role?.key).toBe("admin");
    expect(role?.name).toBe("Admin");
    expect(role?.permissions).toEqual(
      expect.arrayContaining([permission])
    )
  })

  it('Should not create a new role if duplicated key', () => {
      expect(create({
        id: v4(),
        key: "admin",
        name: "Admin",
        status: true,
      })).rejects.toThrow("duplicated key")
  })

  it('Should not create a new role if duplicated key', () => {
    expect(create({
      id: v4(),
      key: "admin",
      name: "Admin",
      status: true,
    })).rejects.toThrow("duplicated key")
  })
})
