import { LoadAccountByTokenUseCaseFunction } from "@/domain/usecases/users/load-account-by-token"

export interface LoadAccountByTokenRepository {
	loadToken: LoadAccountByTokenUseCaseFunction
}
