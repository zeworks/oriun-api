import { Encrypter } from "@/data/protocols/cryptography/encrypter";
import { HashComparer } from "@/data/protocols/cryptography/hash-comparer";
import { LoadAccountByEmailRepository } from "@/data/protocols/repositories/users/load-account-by-email-repository";
import { UpdateTokenRepository } from "@/data/protocols/repositories/users/update-token-repository";
import { CreateAuthenticationUseCase, CreateAuthenticationUseCaseFunction } from "@/domain/usecases/authentication/create-authentication";

export class DbCreateAuthentication implements CreateAuthenticationUseCase {

  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly updateAccessTokenRepository: UpdateTokenRepository
  ){}

  authenticate: CreateAuthenticationUseCaseFunction = async (input) => {
    try {
      const account = await this.loadAccountByEmailRepository.loadByEmail(input.email);
      if (account && account.password) {
        const isValid = await this.hashComparer.compare(input.password, account.password);

        if (isValid) {
          await this.updateAccessTokenRepository.updateToken()
        }
      }

      return null;
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
