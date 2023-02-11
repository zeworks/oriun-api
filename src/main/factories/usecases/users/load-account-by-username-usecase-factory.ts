import { DbLoadAccountByUsername } from "@/data/usecases/users/load-account-by-username"
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository"

export const makeLoadAccountByUsername = () => {
	const usersRepository = new UsersRepository()
	return new DbLoadAccountByUsername(usersRepository)
}
