import { LoadClientsUseCaseFn } from "@/domain/usecases/clients/load-clients-usecase"

export interface LoadClientsRepository {
	loadClients: LoadClientsUseCaseFn
}
