import { DbCreateClient } from "@/data/usecases/clients/db-create-client-usecase"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeLoadClientByIdentificationNumberUseCase } from "./load-client-by-identification-usecase-factory"
import { makeLoadClientByCodeUseCase } from "./load-client-by-code-usecase-factory"
import { ClientsRepository } from "@/infra/db/prisma/repos/clients-repository"

export const makeCreateClientUseCase = () => {
	const uuidAdapter = new UuidAdapter()
	const clientsRepository = new ClientsRepository()
	return new DbCreateClient(
		uuidAdapter,
		makeLoadClientByCodeUseCase(),
		makeLoadClientByIdentificationNumberUseCase(),
		clientsRepository
	)
}
