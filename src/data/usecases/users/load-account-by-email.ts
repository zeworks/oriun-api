import { LoadAccountByEmailRepository } from "@/data/protocols/repositories/users/load-account-by-email-repository";
import { LoadAccountByEmailUseCase, LoadAccountByEmailUseCaseFunction } from "@/domain/usecases/users/load-account-by-email";
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository";

export class DbLoadAccountByEmail implements LoadAccountByEmailUseCase {

  constructor(
    private readonly loadAccountByEmail: LoadAccountByEmailRepository
  ) { }

  loadByEmail: LoadAccountByEmailUseCaseFunction = async (email) => {
    try {
      const result = await this.loadAccountByEmail.loadByEmail(email);
      
      if (result)
        return result;
    } catch (error) {
      throw error;
    }
    return null;
  }
}
