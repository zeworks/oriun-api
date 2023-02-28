import { LoadClientByIdUseCaseFn } from "@/domain/usecases/clients/load-client-by-id-usecase"

export interface LoadClientByIdRepository {
	loadById: LoadClientByIdUseCaseFn
}
