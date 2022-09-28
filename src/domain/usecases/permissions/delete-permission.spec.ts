import { v4 } from "uuid"
import { PermissionsEntity } from "../../entities/permissions"
import { CreatePermissionUseCase } from "./create-permission"
import { DeletePermissionUseCase } from "./delete-permission"
import { UpdatePermissionUseCase } from "./update-permission"

describe('[USE CASE] Delete Permission', () => {

  let permission: PermissionsEntity | null;

  const createPermission: CreatePermissionUseCase = async (input) => {
    return Promise.resolve(input)
  }

  const updatePermission: UpdatePermissionUseCase = async (input) => {

    if (permission?.id !== input.id)
      throw new Error("invalid permission")

    return Promise.resolve({
      ...input,
    }) as any;
  }

  const deletePermission: DeletePermissionUseCase = async (input) => {
    try {
      await updatePermission({ id: input.id, status: false });
      return Promise.resolve(true);
    } catch (error) {
      throw error;
    }
  }
  
  it('Should delete permission with success', async () => {
    permission = await createPermission({
      name: "my permission",
      key: "create_permission",
      id: v4(),
      status: true
    });

    // delete permission
    const data = await deletePermission({
      id: permission?.id!
    })

    expect(data).toBeTruthy();
  })

  it('Should not delete permission if invalid id', async () => {
    permission = await createPermission({
      name: "my permission",
      id: v4(),
      key: "create_permission",
      status: true
    });

    const data = deletePermission({
      id: "123"
    });

    expect(data).rejects.toThrow("invalid permission")
  })
})
