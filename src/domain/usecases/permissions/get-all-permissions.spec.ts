import { v4 as uuid } from "uuid"
import { PermissionsEntity } from "../../entities/permissions"
import { CreatePermissionUseCase } from "./create-permission"
import { GetAllPermissionsUseCase } from "./get-all-permissions";

describe('[USE CASE] Get All Permissions', () => {

  const permissions: PermissionsEntity[] = [];

  const createPermission: CreatePermissionUseCase = async (input) => {
    const data = {
      ...input,
      id: uuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    permissions.push(data);
    return Promise.resolve(data)
  }

  const getPermissions: GetAllPermissionsUseCase = async () => {
    return Promise.resolve(permissions || []);
  }

  it('Should get all permissions', async () => {
    await createPermission({
      name: "permission one",
      status: true,
    })
    await createPermission({
      name: "permission two",
      status: false,
    })
    await createPermission({
      name: "permission three",
      status: true,
    })

    const data = await getPermissions();

    expect(data.length).toBeGreaterThan(0);
    expect(data[1].status).toBe(false);
    expect(data[1].name).toBe("permission two");
  })
})
