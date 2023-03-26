import { DbLoadClientByIdentificationNumber } from "@/data/usecases/clients/db-load-client-by-identificationNumber-usecase"
import { ClientsRepository } from "@/infra/db/prisma/repos/clients-repository"

export const makeLoadClientByIdentificationNumberUseCase = () => {
	const clientsRepository = new ClientsRepository()
	return new DbLoadClientByIdentificationNumber(clientsRepository)
}
