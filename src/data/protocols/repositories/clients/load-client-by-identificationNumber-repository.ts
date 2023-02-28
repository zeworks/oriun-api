import { LoadClientByIdentificationNumberUseCaseFn } from "@/domain/usecases/clients/load-client-by-identificationNumber-usecase"

export interface LoadClientByIdentificationNumberRepository {
	loadByIdentificationNumber: LoadClientByIdentificationNumberUseCaseFn
}
