import { LoadClientByIdUseCaseFn } from "@/domain/usecases/clients/load-client-by-id-usecase"
import { LoadClientByCodeUseCaseFn } from "@/domain/usecases/clients/load-client-by-code-usecase"
import { LoadClientByIdentificationNumberUseCaseFn } from "@/domain/usecases/clients/load-client-by-identificationNumber-usecase"
import {
	CreateClientRepository,
	CreateClientRepositoryFn,
} from "./create-client-repository"
import { LoadClientByCodeRepository } from "./load-client-by-code-repository"
import { LoadClientByIdRepository } from "./load-client-by-id-repository"
import { LoadClientByIdentificationNumberRepository } from "./load-client-by-identificationNumber-repository"
import { ClientsEntity } from "@/domain/entities/clients"
import { UpdateClientRepository } from "./update-client-repository"
import { UpdateClientUseCaseFn } from "@/domain/usecases/clients/update-client-usecase"
import { DeleteClientRepository } from "./delete-client-repository"
import { LoadClientsRepository } from "./load-clients-repository"
import { LoadClientsUseCaseFn } from "@/domain/usecases/clients/load-clients-usecase"

export class InMemoryClientsRepository
	implements
		LoadClientByIdRepository,
		CreateClientRepository,
		LoadClientByCodeRepository,
		LoadClientByIdentificationNumberRepository,
		UpdateClientRepository,
		DeleteClientRepository,
		LoadClientsRepository
{
	clients: Array<ClientsEntity> = []

	loadById: LoadClientByIdUseCaseFn = async (id) =>
		this.clients.find((c) => c.id === id) || null
	create: CreateClientRepositoryFn = async (input) => {
		const data = {
			...input,
			createdAt: new Date(),
		}
		this.clients.push(data)
		return data
	}
	loadByCode: LoadClientByCodeUseCaseFn = async (code) =>
		this.clients.find((c) => c.code === code) || null
	loadByIdentificationNumber: LoadClientByIdentificationNumberUseCaseFn =
		async (identificationNumber) =>
			this.clients.find(
				(c) => c.identificationNumber === identificationNumber
			) || null
	update: UpdateClientUseCaseFn = async (input) => {
		const client = this.clients.find((c) => c.id === input.id)
		return Object.assign({}, client, { ...input, updatedAt: new Date() })
	}
	delete = async (id: string): Promise<boolean | null> => {
		const client = this.clients.find((c) => c.id === id)

		if (client) {
			this.clients = this.clients.filter((c) => c.id !== id)
			return true
		}

		return false
	}
	loadClients: LoadClientsUseCaseFn = async (params) => {
		if (params?.filter?.status !== undefined)
			return this.clients.filter((c) => c.status === params?.filter?.status)

		if (params?.pagination)
			return this.clients.slice(
				params.pagination.skip,
				Number(params.pagination.take) + 1
			)

		if (params?.search)
			return this.clients.filter(
				(c) =>
					c.id === params.search ||
					c.code.includes(params.search || "") ||
					c.name.includes(params.search || "")
			)

		if (params?.orderBy)
			return this.clients.sort((a, b) => {
				if (params.orderBy?.key === "ID") {
					if (params.orderBy.sort === "ASC") return a.id < b.id ? -1 : 1
					return b.id < a.id ? -1 : 1
				}

				if (params.orderBy?.key === "CODE") {
					if (params.orderBy.sort === "ASC") return a.code < b.code ? -1 : 1
					return b.code < a.code ? -1 : 1
				}

				if (params.orderBy?.key === "NAME") {
					if (params.orderBy.sort === "ASC") return a.name < b.name ? -1 : 1
					return b.name < a.name ? -1 : 1
				}

				if (params.orderBy?.key === "CREATEDAT") {
					if (params.orderBy.sort === "ASC")
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						return a.createdAt! < b.createdAt! ? -1 : 1
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					return b.createdAt! < a.createdAt! ? -1 : 1
				}

				return 0
			})

		return this.clients
	}
}
