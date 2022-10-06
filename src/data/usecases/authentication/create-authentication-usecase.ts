import { Encrypter } from "@/data/protocols/cryptography/encrypter";
import { HashComparer } from "@/data/protocols/cryptography/hash-comparer";
import { LoadAccountByEmailRepository } from "@/data/protocols/repositories/users/load-account-by-email-repository";
import { CreateAuthenticationUseCase, CreateAuthenticationUseCaseFunction } from "@/domain/usecases/authentication/create-authentication";

export class DbCreateAuthenticationUseCase implements CreateAuthenticationUseCase {

  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ){}

  authenticate: CreateAuthenticationUseCaseFunction = async (input) => {
    try {
      const account = await this.loadAccountByEmailRepository.loadByEmail(input.email);
      if (account) {
        const isValid = await this.hashComparer.compare(input.password, account.password);

        if (isValid) {
          const accessToken = await this.encrypter.encrypt(account.id);

          return {
            accessToken
          }
        }
      }

      return null;
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
