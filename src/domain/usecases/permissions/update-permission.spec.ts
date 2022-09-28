import { v4 as uuid } from "uuid";
import { CreatePermissionUseCase } from "./create-permission";
import { UpdatePermissionUseCase } from "./update-permission"

describe('[USE CASE] Update Permission', () => {

  const create: CreatePermissionUseCase = input => {
    return Promise.resolve({
      ...input,
      createdAt: new Date().toISOString()
    })
  }

  const update: UpdatePermissionUseCase = (input) => {
    if (!input.id)
      throw new Error("id missing");

    return Promise.resolve(({
      ...input,
      updatedAt: new Date().toISOString(),
    })) as any
  }

  it('Should update permission with success', async () => {
    const permission = await create({
      name: "my permission",
      id: uuid(),
      key: "create_permission",
      status: true
    })

    if (permission?.id) {
      const data = await update({
        ...permission,
        name: "my permission updated"
      })

      expect(data.name).toBe("my permission updated");
      expect(data.id).toBe(permission.id);
    }
  })
})
