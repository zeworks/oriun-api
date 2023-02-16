import {
	LoadAccountByUsernameUseCase,
	LoadAccountByUsernameUseCaseFunction,
} from "@/domain/usecases/users/load-account-by-username"

export class DbLoadAccountByUsername implements LoadAccountByUsernameUseCase {
	constructor(
		private readonly loadAccountByUsername: LoadAccountByUsernameUseCase
	) {}

	loadByUsername: LoadAccountByUsernameUseCaseFunction = (username) =>
		this.loadAccountByUsername.loadByUsername(username)
}
