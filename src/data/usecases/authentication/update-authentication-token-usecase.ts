import { Encrypter } from "@/data/protocols/cryptography/encrypter";
import { UpdateAuthenticationTokenUseCase, UpdateAuthenticationTokenUseCaseFunction } from "@/domain/usecases/authentication/update-authentication-token";
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository";

export class DbUpdateAuthenticationToken implements UpdateAuthenticationTokenUseCase {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly usersRepository: UsersRepository
  ) {}

  updateToken: UpdateAuthenticationTokenUseCaseFunction = async (user_id) => {
    const accessToken = await this.encrypter.encrypt(user_id);
    const result = await this.usersRepository.updateToken(user_id, accessToken);
    return result;
  }
}
