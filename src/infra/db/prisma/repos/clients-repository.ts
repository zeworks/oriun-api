import {
	CreateClientRepository,
	CreateClientRepositoryFn,
} from "@/data/protocols/repositories/clients/create-client-repository"
import { LoadClientByCodeRepository } from "@/data/protocols/repositories/clients/load-client-by-code-repository"
import { LoadClientByIdRepository } from "@/data/protocols/repositories/clients/load-client-by-id-repository"
import { LoadClientByIdentificationNumberRepository } from "@/data/protocols/repositories/clients/load-client-by-identificationNumber-repository"
import { LoadClientByCodeUseCaseFn } from "@/domain/usecases/clients/load-client-by-code-usecase"
import { LoadClientByIdUseCaseFn } from "@/domain/usecases/clients/load-client-by-id-usecase"
import { LoadClientByIdentificationNumberUseCaseFn } from "@/domain/usecases/clients/load-client-by-identificationNumber-usecase"
import { PrismaHelper } from "../prisma-helper"
import { UpdateClientRepository } from "@/data/protocols/repositories/clients/update-client-repository"
import { UpdateClientUseCaseFn } from "@/domain/usecases/clients/update-client-usecase"

export class ClientsRepository
	implements
		CreateClientRepository,
		LoadClientByCodeRepository,
		LoadClientByIdRepository,
		LoadClientByIdentificationNumberRepository,
		UpdateClientRepository
{
	private clients = PrismaHelper.getCollection("clients")

	create: CreateClientRepositoryFn = async (input) =>
		this.clients.create({
			data: {
				...input,
				contacts: {
					connect: input.contacts?.map((contact) => ({
						id: contact.id,
					})),
				},
				company: {
					connect: {
						id: input?.company?.id,
					},
				},
			},
			include: {
				company: true,
				contacts: true,
			},
		})
	loadByCode: LoadClientByCodeUseCaseFn = async (code) =>
		this.clients.findFirst({
			where: {
				code,
			},
			include: {
				company: true,
				contacts: true,
			},
		})
	loadById: LoadClientByIdUseCaseFn = async (id) =>
		this.clients.findUnique({
			where: {
				id,
			},
			include: {
				company: true,
				contacts: true,
			},
		})
	loadByIdentificationNumber: LoadClientByIdentificationNumberUseCaseFn =
		async (identificationNumber) =>
			this.clients.findFirst({
				where: {
					identificationNumber,
				},
				include: {
					company: true,
					contacts: true,
				},
			})
	update: UpdateClientUseCaseFn = async (client) =>
		this.clients.update({
			where: {
				id: client.id,
			},
			data: {
				...client,
				contacts: {
					connect: client.contacts?.map((contact) => ({
						id: contact.id,
					})),
				},
				company: {
					connect: {
						id: client?.company?.id,
					},
				},
			},
			include: {
				company: true,
				contacts: true,
			},
		})
}
