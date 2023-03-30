import { LoadClientsRepository } from "@/data/protocols/repositories/clients/load-clients-repository"
import {
	LoadClientsUseCase,
	LoadClientsUseCaseFn,
} from "@/domain/usecases/clients/load-clients-usecase"

export class DbLoadClients implements LoadClientsUseCase {
	constructor(private readonly loadClientsRepository: LoadClientsRepository) {}

	loadClients: LoadClientsUseCaseFn = (params, context) =>
		this.loadClientsRepository.loadClients(params, context)
}
