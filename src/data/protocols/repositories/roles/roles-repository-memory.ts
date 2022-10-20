import { RolesEntity } from "@/domain/entities/roles";
import { CreateRoleUseCase } from "@/domain/usecases/roles/create-role";
import { LoadRoleByKeyUseCaseFunction } from "@/domain/usecases/roles/load-role-by-key";
import { CheckRoleByKeyRepository } from "./check-role-by-key-respository";
import { CreateRoleRepository } from "./create-role-repository";
import { LoadRoleByKeyRepository } from "./load-role-by-key-repository";

export class InMemoryRolesRepository implements CreateRoleRepository, CheckRoleByKeyRepository, LoadRoleByKeyRepository {
  roles: RolesEntity[] = [];

  create = async (params: CreateRoleUseCase.Params): Promise<CreateRoleUseCase.Result> => {
    this.roles.push(params);
    return this.roles[this.roles.length - 1];
  };

  checkByKey = async (key: string): Promise<CheckRoleByKeyRepository.Result> => {
    return this.roles.some(role => role.key === key);
  }

  loadByKey: LoadRoleByKeyUseCaseFunction = (key): any => {
    const result = this.roles.find(role => role.key === key);

    if (result)
      return result;
    
    return null
  }
}
