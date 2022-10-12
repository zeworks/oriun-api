import { DbCheckRoleByKey } from "@/data/usecases/roles/check-role-by-key-usecase"
import { DbCreateRole } from "@/data/usecases/roles/create-role-usecase";
import { faker } from "@faker-js/faker";
import { InMemoryRolesRepository } from "./roles-repository-memory"

const rolesRepository = new InMemoryRolesRepository();

const makeCheckRoleByKeyRepository = () => {
  const checkRoleByKeyRepository = new DbCheckRoleByKey(rolesRepository);

  return {
    checkRoleByKeyRepository
  }
}

describe("[REPOSITORIES] Check Role By Key", () => {
  it('Should return false if key does not exists', async () => {
    const { checkRoleByKeyRepository } = makeCheckRoleByKeyRepository();
    const createRoleRepository = new DbCreateRole(rolesRepository, rolesRepository);
    const role = await createRoleRepository.create({
      id: faker.datatype.uuid(),
      key: faker.word.adjective(5),
      name: faker.name.firstName(),
      status: faker.datatype.boolean()
    })

    if (role) {
      const keyExists = await checkRoleByKeyRepository.checkByKey("asdasd");
      expect(keyExists).toBeFalsy()
    }
  })

  it('Should return true if key already exists', async () => {
    const { checkRoleByKeyRepository } = makeCheckRoleByKeyRepository();
    const createRoleRepository = new DbCreateRole(rolesRepository, rolesRepository);
    const role = await createRoleRepository.create({
      id: faker.datatype.uuid(),
      key: faker.word.adjective(5),
      name: faker.name.firstName(),
      status: faker.datatype.boolean()
    })

    if (role) {
      const result = await checkRoleByKeyRepository.checkByKey(role.key);
      expect(result).toBeTruthy();
    }
  })
})
