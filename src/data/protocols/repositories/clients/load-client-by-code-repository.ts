import { LoadClientByCodeUseCaseFn } from "@/domain/usecases/clients/load-client-by-code-usecase"

export interface LoadClientByCodeRepository {
	loadByCode: LoadClientByCodeUseCaseFn
}
