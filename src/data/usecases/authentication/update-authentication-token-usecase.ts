import { Encrypter } from "@/data/protocols/cryptography/encrypter";
import { UpdateTokenRepository } from "@/data/protocols/repositories/users/update-token-repository";
import { UpdateAuthenticationTokenUseCase, UpdateAuthenticationTokenUseCaseFunction } from "@/domain/usecases/authentication/update-authentication-token";

export class DbUpdateAuthenticationToken implements UpdateAuthenticationTokenUseCase {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly updateTokenRepository: UpdateTokenRepository
  ) {}

  updateToken: UpdateAuthenticationTokenUseCaseFunction = async (user_id) => {
    const accessToken = await this.encrypter.encrypt(user_id);
    const result = await this.updateTokenRepository.updateToken(user_id, accessToken);
    return result;
  }
}
