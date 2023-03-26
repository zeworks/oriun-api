import { InMemoryClientsRepository } from "@/data/protocols/repositories/clients/in-memory-clients-repository"
import { expect, test } from "vitest"
import { UpdateClientController } from "./update-client-controller"
import { DbUpdateClient } from "@/data/usecases/clients/db-update-client-usecase"
import { DbLoadClientById } from "@/data/usecases/clients/db-load-client-by-id-usecase"
import { makeUpdateClientControllerValidation } from "@/main/factories/controllers/clients/update-client-controller-validation"
import { ClientInvalidError } from "@/data/errors/clients-error"

test("Should update client with success", async () => {
	const clientsRepository = new InMemoryClientsRepository()

	clientsRepository.clients = [
		{
			id: "12345",
			code: "CLIENT_CODE",
			identificationNumber: "CLIENT_IDENTIFICATION",
			name: "CLIENT_NAME",
		},
	]

	const loadClientByIdUseCase = new DbLoadClientById(clientsRepository)
	const updateClientUseCase = new DbUpdateClient(
		loadClientByIdUseCase,
		clientsRepository
	)
	const updateClientController = new UpdateClientController(
		updateClientUseCase,
		makeUpdateClientControllerValidation()
	)

	const result = await updateClientController.execute({
		id: clientsRepository.clients[0].id,
		code: "CLIENT_CODE_UPDATED",
	})

	expect(result.data?.code).toEqual("CLIENT_CODE_UPDATED")
})

test("Should throw an error if invalid client id", async () => {
	const clientsRepository = new InMemoryClientsRepository()

	clientsRepository.clients = [
		{
			id: "12345",
			code: "CLIENT_CODE",
			identificationNumber: "CLIENT_IDENTIFICATION",
			name: "CLIENT_NAME",
		},
	]

	const loadClientByIdUseCase = new DbLoadClientById(clientsRepository)
	const updateClientUseCase = new DbUpdateClient(
		loadClientByIdUseCase,
		clientsRepository
	)
	const updateClientController = new UpdateClientController(
		updateClientUseCase,
		makeUpdateClientControllerValidation()
	)

	const result = await updateClientController.execute({
		id: "12",
		code: "CLIENT_CODE_UPDATED",
	})

	expect(clientsRepository.clients.length).toEqual(1)
	expect(result.data).toEqual(new ClientInvalidError())
})
