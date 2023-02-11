import { DbDeleteAccount } from "@/data/usecases/users/db-delete-account"
import { DbLoadAccountById } from "@/data/usecases/users/load-account-by-id"
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository"

export const makeDeleteAccountUseCase = () => {
	const usersRepository = new UsersRepository()
	const dbLoadAccountById = new DbLoadAccountById(usersRepository)
	return new DbDeleteAccount(dbLoadAccountById, usersRepository)
}
