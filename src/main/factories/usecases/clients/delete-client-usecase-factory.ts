import { DbDeleteClient } from "@/data/usecases/clients/db-delete-client-usecase"
import { makeLoadClientByIdUseCase } from "./load-client-by-id-usecase-factory"
import { ClientsRepository } from "@/infra/db/prisma/repos/clients-repository"

export const makeDeleteClientUseCase = () => {
	const clientsRepository = new ClientsRepository()
	return new DbDeleteClient(makeLoadClientByIdUseCase(), clientsRepository)
}
