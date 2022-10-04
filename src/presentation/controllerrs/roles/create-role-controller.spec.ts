import { InMemoryRolesRepository } from "@/data/protocols/repositories/roles/repository-memory";
import { DbCreateRole } from "@/data/usecases/roles/create-role-usecase";
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateRoleValidation } from "@/main/factories/controllers/roles/create-role-validation-factory";
import { Controller } from "@/presentation/protocols/controller"
import { CreateRoleController } from "./create-role-controller"

const rolesRepository = new InMemoryRolesRepository();

const makeCreateRoleController = (): Controller<CreateRoleController.Request> => {
  const uuidAdapter = new UuidAdapter();
  const createRoleUseCase = new DbCreateRole(rolesRepository, rolesRepository);
  return new CreateRoleController(uuidAdapter, makeCreateRoleValidation(), createRoleUseCase)
}

describe('[CONTROLLER] Create Role', () => {
  it('Should create role with success', async () => {
    const data = await makeCreateRoleController().execute({
      data: {
        key: "role_key",
        name: "nome role",
        status: false
      }
    });
    
    expect(data.data.name).toBe("nome role");
    expect(data.data.status).toBe(false);
    expect(data.data.key).toBe("role_key")
  })
})
