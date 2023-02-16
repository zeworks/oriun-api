import { DbUpdateAccount } from "@/data/usecases/users/db-update-account"
import { DbLoadAccountById } from "@/data/usecases/users/load-account-by-id"
import { DbLoadAccountByUsername } from "@/data/usecases/users/load-account-by-username"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository"

export const makeUpdateAccountUseCase = () => {
	const hashAdapter = new BcryptAdapter(8)
	const usersRepository = new UsersRepository()
	const dbLoadAccountById = new DbLoadAccountById(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
	return new DbUpdateAccount(
		hashAdapter,
		dbLoadAccountById,
		dbLoadAccountByUsername,
		usersRepository
	)
}
