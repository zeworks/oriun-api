import { ClientInvalidError } from "@/data/errors/clients-error"
import { DeleteClientRepository } from "@/data/protocols/repositories/clients/delete-client-repository"
import { LoadClientByIdRepository } from "@/data/protocols/repositories/clients/load-client-by-id-repository"
import {
	DeleteClientUseCase,
	DeleteClientUseCaseFn,
} from "@/domain/usecases/clients/delete-client-usecase"

export class DbDeleteClient implements DeleteClientUseCase {
	constructor(
		private readonly loadClientByIdRepository: LoadClientByIdRepository,
		private readonly deleteClientRepository: DeleteClientRepository
	) {}

	delete: DeleteClientUseCaseFn = async (id) => {
		const client = await this.loadClientByIdRepository.loadById(id)

		if (!client) throw new ClientInvalidError()

		return this.deleteClientRepository.delete(id)
	}
}
