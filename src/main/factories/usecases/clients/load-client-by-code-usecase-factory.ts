import { DbLoadClientByCode } from "@/data/usecases/clients/db-load-client-by-code-usecase"
import { ClientsRepository } from "@/infra/db/prisma/repos/clients-repository"

export const makeLoadClientByCodeUseCase = () => {
	const clientsRepository = new ClientsRepository()
	return new DbLoadClientByCode(clientsRepository)
}
