import { UsersEntity } from "@/domain/entities/users"
import { Datatable } from "@/domain/types/datatable"

export type LoadAccountsUseCaseFunction =
	() => Promise<LoadAccountsUseCase.Result>

export interface LoadAccountsUseCase {
	loadAccounts: LoadAccountsUseCaseFunction
}

export namespace LoadAccountsUseCase {
	export type Result = Datatable<UsersEntity>
}
