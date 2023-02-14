import { LoadAccountByEmailUseCaseFunction } from "@/domain/usecases/users/load-account-by-email"

export interface LoadAccountByEmailRepository {
	loadByEmail: LoadAccountByEmailUseCaseFunction
}
