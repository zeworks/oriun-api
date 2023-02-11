import { LoadAccountByUsernameUseCaseFunction } from "@/domain/usecases/users/load-account-by-username"

export interface LoadAccountByUsernameRepository {
	loadByUsername: LoadAccountByUsernameUseCaseFunction
}
