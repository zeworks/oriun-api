import { DbLoadAccountByEmail } from "@/data/usecases/users/load-account-by-email"
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository"

export const makeLoadAccountByEmail = () => {
	const usersRepository = new UsersRepository()
	return new DbLoadAccountByEmail(usersRepository)
}
