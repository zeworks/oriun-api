import { UserInvalidError } from "@/data/errors/user-invalid-error";
import { Encrypter } from "@/data/protocols/cryptography/encrypter";
import { HashComparer } from "@/data/protocols/cryptography/hash-comparer";
import { LoadAccountByEmailRepository } from "@/data/protocols/repositories/users/load-account-by-email-repository";
import { UpdateTokenRepository } from "@/data/protocols/repositories/users/update-token-repository";
import { CreateAuthenticationUseCase, CreateAuthenticationUseCaseFunction } from "@/domain/usecases/authentication/create-authentication";

export class DbCreateAuthentication implements CreateAuthenticationUseCase {

  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessToken: UpdateTokenRepository
  ) { }

  authenticate: CreateAuthenticationUseCaseFunction = async (input) => {
    try {
      const account = await this.loadAccountByEmailRepository.loadByEmail(input.email);

      if (!account || !account.status)
        throw new UserInvalidError()
      
      if (account && account.password) {
        const isValid = await this.hashComparer.compare(input.password, account.password);
        
        if (!isValid)
          throw new UserInvalidError()
        
        const accessToken = await this.encrypter.encrypt(account.id);
        return await this.updateAccessToken.updateToken(account.id, accessToken)
      }

      return null;
    } catch (error: any) {
      throw error
    }
  }
}
