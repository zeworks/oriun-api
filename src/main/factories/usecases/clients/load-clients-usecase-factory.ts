import { DbLoadClients } from "@/data/usecases/clients/db-load-clients-usecase"
import { ClientsRepository } from "@/infra/db/prisma/repos/clients-repository"

export const makeLoadClientsUseCase = () => {
	const clientsRepository = new ClientsRepository()
	return new DbLoadClients(clientsRepository)
}
