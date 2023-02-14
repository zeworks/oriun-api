import { LoadAccountsRepository } from "@/data/protocols/repositories/users/load-accounts-repository"
import {
	LoadAccountsUseCase,
	LoadAccountsUseCaseFunction,
} from "@/domain/usecases/users/load-accounts"

export class DbLoadAccounts implements LoadAccountsUseCase {
	constructor(
		private readonly loadAccountsRepository: LoadAccountsRepository
	) {}

	loadAccounts: LoadAccountsUseCaseFunction = () => {
		return this.loadAccountsRepository.loadAccounts()
	}
}
