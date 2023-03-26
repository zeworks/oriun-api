import { DbLoadClientById } from "@/data/usecases/clients/db-load-client-by-id-usecase"
import { ClientsRepository } from "@/infra/db/prisma/repos/clients-repository"

export const makeLoadClientByIdUseCase = () => {
	const clientsRepository = new ClientsRepository()
	return new DbLoadClientById(clientsRepository)
}
