import { DbLoadAccounts } from "@/data/usecases/users/db-load-accounts"
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository"

export const makeDbLoadAccounts = () => {
	const usersRepository = new UsersRepository()
	return new DbLoadAccounts(usersRepository)
}
