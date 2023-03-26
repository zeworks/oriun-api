import { ClientInvalidError } from "@/data/errors/clients-error"
import { LoadClientByIdRepository } from "@/data/protocols/repositories/clients/load-client-by-id-repository"
import { UpdateClientRepository } from "@/data/protocols/repositories/clients/update-client-repository"
import {
	UpdateClientUseCase,
	UpdateClientUseCaseFn,
} from "@/domain/usecases/clients/update-client-usecase"

export class DbUpdateClient implements UpdateClientUseCase {
	constructor(
		private readonly loadClientByIdRepository: LoadClientByIdRepository,
		private readonly updateClientRepository: UpdateClientRepository
	) {}

	update: UpdateClientUseCaseFn = async (input) => {
		const client = await this.loadClientByIdRepository.loadById(input.id)

		if (!client) throw new ClientInvalidError()

		return this.updateClientRepository.update(input)
	}
}
