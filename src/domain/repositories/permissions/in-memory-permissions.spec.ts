import { v4 } from "uuid";
import { InMemoryPermissionsRepository } from "./in-memory-permissions"

describe('[REPOSITORIES] In Memory Permissions', () => {
  //#region create permission
  it('Should create permission with success', async () => {
    const permissionRepository = new InMemoryPermissionsRepository();
    const data = await permissionRepository.create({
      id: v4(),
      key: "key_test",
      name: "Key Name",
      status: true,
    })

    expect(data?.key).toBe("key_test");
    expect(data?.name).toBe("Key Name");
    expect(data?.status).toBe(true);
  })

  it('Should not create permission if duplicated key', async () => {
    const permissionRepository = new InMemoryPermissionsRepository();

    await permissionRepository.create({
      id: v4(),
      key: "key_test",
      name: "Key Name",
      status: true,
    })

    expect(permissionRepository.create({
      id: v4(),
      key: "key_test",
      name: "Key Name",
      status: true,
    })).rejects.toThrow("permission already exists")
  })

  it('Should not create permission if empty key', async () => {
    const permissionRepository = new InMemoryPermissionsRepository();

    expect(permissionRepository.create({
      id: v4(),
      key: "",
      name: "Key Name",
      status: true,
    })).rejects.toThrow("key missing")
  })

  it('Should not create permission if empty id', async () => {
    const permissionRepository = new InMemoryPermissionsRepository();

    expect(permissionRepository.create({
      id: "",
      key: "",
      name: "Key Name",
      status: true,
    })).rejects.toThrow("id missing")
  })

  it('Should not create permission if empty name', async () => {
    const permissionRepository = new InMemoryPermissionsRepository();

    expect(permissionRepository.create({
      id: "21",
      key: "22",
      name: "",
      status: true,
    })).rejects.toThrow("name missing")
  })
  //#endregion
  //#region update permission
  it('Should update permission with success', async () => {
    const id = v4();

    const permissionRepository = new InMemoryPermissionsRepository();
    await permissionRepository.create({
      id,
      key: `permission_${id}`,
      name: "permission name",
      status: true,
    })

    const update = await permissionRepository.update({
      id,
      name: "permission name updated",
      status: false
    })

    expect(update.name).toBe("permission name updated");
    expect(update.status).toBe(false);
    expect(update.key).toBe(`permission_${id}`);
  })

  it('Should not update permission if empty id', async () => {
    const permissionRepository = new InMemoryPermissionsRepository();
   
    expect(
      permissionRepository.update({
        id: ""
      })
    ).rejects.toThrow("id missing");
  })

  it('Should not update permission if not found by id', async () => {
    const permissionRepository = new InMemoryPermissionsRepository();

    expect(
      permissionRepository.update({
        id: "123",
        name: "permission name updated"
      })
    ).rejects.toThrow("permission not found");
  })
  //#endregion
})
