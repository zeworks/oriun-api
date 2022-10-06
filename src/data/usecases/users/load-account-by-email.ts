import { LoadAccountByEmailUseCase, LoadAccountByEmailUseCaseFunction } from "@/domain/usecases/users/load-account-by-email";
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository";

export class DbLoadAccountByEmail implements LoadAccountByEmailUseCase {

  constructor(
    private readonly usersRepository: UsersRepository
  ) { }

  loadByEmail: LoadAccountByEmailUseCaseFunction = async (email) => {
    const result = await this.usersRepository.loadByEmail(email);

    if (result)
      return result;

    return null;
  }
}
