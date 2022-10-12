import { DEFAULT_JWT_SECRET } from "@/data/constants"
import { DbCreateAuthentication } from "@/data/usecases/authentication/create-authentication-usecase"
import { DbUpdateAuthenticationToken } from "@/data/usecases/authentication/update-authentication-token-usecase"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter"
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository"
import { makeLoadAccountByEmail } from "../users/load-account-by-email-usecase-factory"

export const makeDbCreateAuthenticationUseCase = () => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt);
  const encryptAdapter = new JwtAdapter(DEFAULT_JWT_SECRET)
  const usersRepository = new UsersRepository();
  const updateAccessToken = new DbUpdateAuthenticationToken(encryptAdapter, usersRepository)
  return new DbCreateAuthentication(makeLoadAccountByEmail(), bcryptAdapter, updateAccessToken)
}
