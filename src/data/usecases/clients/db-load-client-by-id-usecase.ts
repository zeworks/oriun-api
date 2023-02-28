import { LoadClientByIdRepository } from "@/data/protocols/repositories/clients/load-client-by-id-repository"
import {
	LoadClientByIdUseCase,
	LoadClientByIdUseCaseFn,
} from "@/domain/usecases/clients/load-client-by-id-usecase"

export class DbLoadClientById implements LoadClientByIdUseCase {
	constructor(
		private readonly loadClientByIdRepository: LoadClientByIdRepository
	) {}

	loadById: LoadClientByIdUseCaseFn = (id) =>
		this.loadClientByIdRepository.loadById(id)
}
