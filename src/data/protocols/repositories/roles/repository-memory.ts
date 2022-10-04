import { RolesEntity } from "@/domain/entities/roles";
import { CreateRoleUseCase } from "@/domain/usecases/roles/create-role";
import { CheckRoleByKeyRepository } from "./check-role-by-key-respository";
import { CreateRoleRepository } from "./create-role-repository";

export class InMemoryRolesRepository implements CreateRoleRepository, CheckRoleByKeyRepository {
  roles: RolesEntity[] = [];

  create = async (params: CreateRoleUseCase.Params): Promise<CreateRoleUseCase.Result> => {
    this.roles.push(params);
    return this.roles[this.roles.length - 1];
  };

  checkByKey = async (key: string): Promise<CheckRoleByKeyRepository.Result> => {
    return this.roles.some(role => role.key === key);
  }
}
