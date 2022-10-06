import { EmailInUseError } from "@/data/errors/email-in-use-error";
import { UsernameInUseError } from "@/data/errors/username-in-use-error";
import { Uuid } from "@/data/protocols/cryptography/uuid";
import { CreateAccountRepository } from "@/data/protocols/repositories/users/create-account-repository";
import { LoadAccountByEmailRepository } from "@/data/protocols/repositories/users/load-account-by-email-repository";
import { LoadAccountByUsernameRepository } from "@/data/protocols/repositories/users/load-account-by-username-repository";
import { CreateAccountUseCase, CreateAccountUseCaseFunction } from "@/domain/usecases/users/create-account";

export class DbCreateAccount implements CreateAccountUseCase {

  constructor(
    private readonly uuidAdapter: Uuid,
    private readonly loadAccountByEmail: LoadAccountByEmailRepository,
    private readonly loadAccountByUsername: LoadAccountByUsernameRepository,
    private readonly createAccount: CreateAccountRepository
  ) {}

  create: CreateAccountUseCaseFunction = async (data) => {
    try {
      const emailAlreadyExists = await this.loadAccountByEmail.loadByEmail(data.email);

      if (emailAlreadyExists)
        throw new EmailInUseError();
      
      const usernameAlreadyExists = await this.loadAccountByUsername.loadByUsername(data.username);

      if (usernameAlreadyExists)
        throw new UsernameInUseError();
      
      const id = await this.uuidAdapter.generate();

      const result = await this.createAccount.create({
        ...data,
        id,
        status: data.status ?? false
      });

      return result
    } catch (error) {
      throw error;
    }
  }
}
