import { LoadAccountByIdUseCaseFunction } from "@/domain/usecases/users/load-account-by-id"

export interface LoadAccountByIdRepository {
	loadById: LoadAccountByIdUseCaseFunction
}
