import { UserInvalidError } from "@/data/errors/user-invalid-error";
import { HashComparer } from "@/data/protocols/cryptography/hash-comparer";
import { LoadAccountByEmailRepository } from "@/data/protocols/repositories/users/load-account-by-email-repository";
import { CreateAuthenticationUseCase, CreateAuthenticationUseCaseFunction } from "@/domain/usecases/authentication/create-authentication";
import { DbUpdateAuthenticationToken } from "./update-authentication-token-usecase";

export class DbCreateAuthentication implements CreateAuthenticationUseCase {

  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly updateAccessToken: DbUpdateAuthenticationToken
  ) { }

  authenticate: CreateAuthenticationUseCaseFunction = async (input) => {
    try {
      const account = await this.loadAccountByEmailRepository.loadByEmail(input.email);

      if (!account)
        throw new UserInvalidError()
      
      if (account && account.password) {
        const isValid = await this.hashComparer.compare(input.password, account.password);

        if (!isValid)
          throw new UserInvalidError()

        const result = await this.updateAccessToken.updateToken(account.id)
        if (result?.accessToken)
          return {
            accessToken: result.accessToken
          }
      }
      return null;
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
