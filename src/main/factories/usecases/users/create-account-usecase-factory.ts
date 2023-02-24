import { DbCreateAccount } from "@/data/usecases/users/db-create-account"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository"
import { makeLoadAccountByEmail } from "./load-account-by-email-usecase-factory"
import { makeLoadAccountByUsername } from "./load-account-by-username-usecase-factory"

export const makeDbCreateAccountUseCase = () => {
	const uuidAdapter = new UuidAdapter()
	const encrypter = new BcryptAdapter(12)
	const usersRepository = new UsersRepository()
	return new DbCreateAccount(
		uuidAdapter,
		encrypter,
		makeLoadAccountByEmail(),
		makeLoadAccountByUsername(),
		usersRepository
	)
}
