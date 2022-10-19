import { AccessTokenInvalidError } from "@/data/errors/accessToken-invalid-error";
import { Decrypter } from "@/data/protocols/cryptography/decrypter";
import { LoadRoleByKeyRepository } from "@/data/protocols/repositories/roles/load-role-by-key-repository";
import { LoadAccountByTokenRepository } from "@/data/protocols/repositories/users/load-account-by-token-repository";
import { LoadAccountByTokenUseCase, LoadAccountByTokenUseCaseFunction } from "@/domain/usecases/users/load-account-by-token";

export class DbLoadAccountByToken implements LoadAccountByTokenUseCase {

  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
    private readonly loadRoleByKeyRepository: LoadRoleByKeyRepository
  ) { }

  loadToken: LoadAccountByTokenUseCaseFunction = async (accessToken, rolekey) => {

    try {
      const token = await this.decrypter.decrypt(accessToken);

      if (!token)
        throw new AccessTokenInvalidError()

      const role = await this.loadRoleByKeyRepository.loadByKey(rolekey);

      if (!role)
        throw new Error("your role is invalid to make this request")
      
      const account = await this.loadAccountByTokenRepository.loadToken(accessToken, role?.id);

      return account;
    } catch (error) {
      throw error;
    }
  };
}
