import { LoadAccountsUseCaseFunction } from "@/domain/usecases/users/load-accounts"

export interface LoadAccountsRepository {
	loadAccounts: LoadAccountsUseCaseFunction
}
