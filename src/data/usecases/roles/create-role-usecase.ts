import { Uuid } from "@/data/protocols/cryptography/uuid";
import { CheckRoleByKeyRepository } from "@/data/protocols/repositories/roles/check-role-by-key-respository";
import { CreateRoleRepository } from "@/data/protocols/repositories/roles/create-role-repository";
import { CreateRoleUseCase, CreateRoleUseCaseFunction } from "@/domain/usecases/roles/create-role";

export class DbCreateRole implements CreateRoleUseCase {

  constructor(
    private readonly checkRoleByKeyRepository: CheckRoleByKeyRepository,
    private readonly createRoleRepository: CreateRoleRepository
  ) { }

  create: CreateRoleUseCaseFunction = async (input) => {
    const keyExists = await this.checkRoleByKeyRepository.checkByKey(input.key);
    
    if (keyExists)
      return null;

    try {
      const role = await this.createRoleRepository.create(input)
      return role;
    } catch (error) {
      return null
    }
  }
}
