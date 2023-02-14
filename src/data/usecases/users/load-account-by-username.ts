import {
	LoadAccountByUsernameUseCase,
	LoadAccountByUsernameUseCaseFunction,
} from "@/domain/usecases/users/load-account-by-username"
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository"

export class DbLoadAccountByUsername implements LoadAccountByUsernameUseCase {
	constructor(private readonly usersRepository: UsersRepository) {}

	loadByUsername: LoadAccountByUsernameUseCaseFunction = (username) => {
		return this.usersRepository.loadByUsername(username)
	}
}
