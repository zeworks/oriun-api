import { DbUpdateClient } from "@/data/usecases/clients/db-update-client-usecase"
import { makeLoadClientByIdUseCase } from "./load-client-by-id-usecase-factory"
import { ClientsRepository } from "@/infra/db/prisma/repos/clients-repository"

export const makeUpdateClientUseCase = () => {
	const clientsRepository = new ClientsRepository()
	return new DbUpdateClient(makeLoadClientByIdUseCase(), clientsRepository)
}
