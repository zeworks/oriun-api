import { InMemoryClientsRepository } from "@/data/protocols/repositories/clients/in-memory-clients-repository"
import { expect, test } from "vitest"
import { LoadClientByIdController } from "./load-client-id-controller"
import { DbLoadClientById } from "@/data/usecases/clients/db-load-client-by-id-usecase"
import { ClientInvalidError } from "@/data/errors/clients-error"

test("Should load client by id with success", async () => {
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
	const controller = new LoadClientByIdController(loadClientByIdUseCase)

	const result = await controller.execute({
		id: "12345",
	})

	expect(result.data?.code).toEqual("CLIENT_CODE")
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
	const controller = new LoadClientByIdController(loadClientByIdUseCase)

	const result = await controller.execute({
		id: "123",
	})

	expect(clientsRepository.clients[0].code).toEqual("CLIENT_CODE")
	expect(result.data).toEqual(new ClientInvalidError())
})
