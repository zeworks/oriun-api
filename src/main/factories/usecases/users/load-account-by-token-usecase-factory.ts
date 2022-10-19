import { DEFAULT_JWT_SECRET } from "@/data/constants";
import { DbLoadAccountByToken } from "@/data/usecases/users/load-account-by-token";
import { LoadAccountByTokenUseCase } from "@/domain/usecases/users/load-account-by-token";
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter";
import { RolesRepository } from "@/infra/db/prisma/repos/roles-repository";
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository";

export const makeLoadAccountByTokenUseCase = (): LoadAccountByTokenUseCase => {
  const decrypter = new JwtAdapter(DEFAULT_JWT_SECRET);
  const accountRepository = new UsersRepository();
  const rolesRepository = new RolesRepository();
  return new DbLoadAccountByToken(decrypter, accountRepository, rolesRepository)
}
