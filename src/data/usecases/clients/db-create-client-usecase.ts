import {
	ClientCodeInUseError,
	ClientIdentificationNumberInUseError,
} from "@/data/errors/clients-error"
import { CreateClientRepository } from "@/data/protocols/repositories/clients/create-client-repository"
import { LoadClientByCodeRepository } from "@/data/protocols/repositories/clients/load-client-by-code-repository"
import { LoadClientByIdentificationNumberRepository } from "@/data/protocols/repositories/clients/load-client-by-identificationNumber-repository"
import {
	CreateClientUseCase,
	CreateClientUseCaseFn,
} from "@/domain/usecases/clients/create-client-usecase"
import { UuidAdapter } from "@/infra/cryptography/uuid"

export class DbCreateClientUseCase implements CreateClientUseCase {
	constructor(
		private readonly uuidAdaptar: UuidAdapter,
		private readonly loadClientByCodeRepository: LoadClientByCodeRepository,
		private readonly loadClientByIdentificationNumberRepository: LoadClientByIdentificationNumberRepository,
		private readonly createClientRepository: CreateClientRepository
	) {}

	create: CreateClientUseCaseFn = async (input) => {
		const clientFoundByCode = await this.loadClientByCodeRepository.loadByCode(
			input.code
		)
		const clientFoundByIdentificatioNumber =
			await this.loadClientByIdentificationNumberRepository.loadByIdentificationNumber(
				input.identificationNumber
			)

		if (clientFoundByCode) throw new ClientCodeInUseError()
		if (clientFoundByIdentificatioNumber)
			throw new ClientIdentificationNumberInUseError()

		const id = await this.uuidAdaptar.generate()

		return this.createClientRepository.create({
			...input,
			status: input.status ?? false,
			company: input.company ?? null,
			id,
		})
	}
}
