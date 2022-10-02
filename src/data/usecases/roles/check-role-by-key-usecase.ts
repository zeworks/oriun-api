import { CheckRoleByKeyRepository } from "@/data/protocols/repositories/roles/check-role-by-key-respository";
import { CheckRoleByKeyUseCase, CheckRoleByKeyUseCaseFunction } from "@/domain/usecases/roles/check-role-by-key";

export class DbCheckRoleByKey implements CheckRoleByKeyUseCase {
  constructor(
    private readonly checkRoleByKeyRepository: CheckRoleByKeyRepository
  ) { }

  checkByKey: CheckRoleByKeyUseCaseFunction = async (input) => {
    return this.checkRoleByKeyRepository.checkByKey(input.key);
  }
}
