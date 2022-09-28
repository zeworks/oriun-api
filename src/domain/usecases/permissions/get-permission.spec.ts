import { CreatePermissionUseCase } from "./create-permission"
import { v4 as uuid } from "uuid";
import { PermissionsEntity } from "../../entities/permissions";
import { GetPermissionByIdUseCase } from "./get-permission";

describe('[USE CASE] Get Permission', () => {

  const permissions: PermissionsEntity[] = [];

  const createPermission: CreatePermissionUseCase = (input) => {
    const data = {
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    permissions.push(data);
    return Promise.resolve(data)
  }

  const getPermission: GetPermissionByIdUseCase = async (input) => {
    // find for permission on permissions list
    const permission = permissions.find(p => p.id === input.id);
    // invalid throw an error
    if (!permission?.id)
      throw new Error("permission does not exist");
    // return the permission found
    return Promise.resolve(permission);
  }

  it('Should get permission by id with success', async () => {
    await createPermission({
      name: "permission one",
      id: uuid(),
      key: "create_permission",
      status: true,
    })

    const secondPermission = await createPermission({
      name: "permission second",
      id: uuid(),
      key: "create_permission",
      status: true,
    })

    const permission = await getPermission({ id: secondPermission?.id! });

    expect(permission?.name).toBe("permission second");
    expect(permission?.id).toBe(secondPermission?.id);
  })

  it('Should not get permission with invalid id', async () => {
    expect(getPermission({ id: "123" })).rejects.toThrow("permission does not exist")
  })
})
