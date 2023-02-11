import { DEFAULT_JWT_SECRET } from "@/config/jwt"
import { DbLoadAccountByToken } from "@/data/usecases/users/load-account-by-token"
import { LoadAccountByTokenUseCase } from "@/domain/usecases/users/load-account-by-token"
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter"
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository"

export const makeLoadAccountByTokenUseCase = (): LoadAccountByTokenUseCase => {
	const decrypter = new JwtAdapter(DEFAULT_JWT_SECRET)
	const accountRepository = new UsersRepository()
	return new DbLoadAccountByToken(decrypter, accountRepository)
}
