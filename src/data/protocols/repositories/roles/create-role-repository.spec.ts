import { DbCreateRole } from "@/data/usecases/roles/create-role-usecase";
import { InMemoryRolesRepository } from "./repository-memory"
import { faker } from "@faker-js/faker"

const roleRepository = new InMemoryRolesRepository();

const makeCreateRoleRepository = () => {
  const createRole = new DbCreateRole(roleRepository, roleRepository);

  return {
    createRole
  }
}

describe('[REPOSITORIES] Create Role', () => {
  it("Should create role with success", async () => {
    const { createRole } = makeCreateRoleRepository()
    const role = {
      id: faker.datatype.uuid(),
      key: faker.random.word(),
      name: faker.random.word(),
      status: faker.datatype.boolean()
    }
    await createRole.create(role);
    const repoData = roleRepository.roles[roleRepository.roles.length - 1];
    expect(role.name).toBe(repoData.name)
  })

  it("Should not role with duplicated key", async () => {
    const { createRole } = makeCreateRoleRepository()
    const role = {
      id: faker.datatype.uuid(),
      key: "key_name",
      name: faker.random.word(),
      status: faker.datatype.boolean()
    }
    await createRole.create(role);
    const promise = await createRole.create(role);
    expect(promise).toBe(null)
  })
})
