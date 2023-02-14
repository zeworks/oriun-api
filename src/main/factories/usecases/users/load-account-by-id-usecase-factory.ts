import { DbLoadAccountById } from "@/data/usecases/users/load-account-by-id"
import { LoadAccountByIdUseCase } from "@/domain/usecases/users/load-account-by-id"
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository"

export const makeLoadAccountByIdUseCase = (): LoadAccountByIdUseCase => {
	const usersRepository = new UsersRepository()
	return new DbLoadAccountById(usersRepository)
}
