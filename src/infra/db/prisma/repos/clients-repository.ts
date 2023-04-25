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
import { DeleteClientRepository } from "@/data/protocols/repositories/clients/delete-client-repository"
import { DeleteClientUseCaseFn } from "@/domain/usecases/clients/delete-client-usecase"
import { LoadClientsRepository } from "@/data/protocols/repositories/clients/load-clients-repository"
import { LoadClientsUseCaseFn } from "@/domain/usecases/clients/load-clients-usecase"
import { roleValidation } from "@/validation/role-validation"

export class ClientsRepository
	implements
		CreateClientRepository,
		LoadClientByCodeRepository,
		LoadClientByIdRepository,
		LoadClientByIdentificationNumberRepository,
		UpdateClientRepository,
		DeleteClientRepository,
		LoadClientsRepository
{
	private clients = PrismaHelper.getCollection("clients")

	create: CreateClientRepositoryFn = async (input, context) =>
		this.clients.create({
			data: {
				...input,
				contacts: {
					connect: input.contacts?.map((contact) => ({
						id: contact.id,
					})),
				},
				company: input?.company?.id
					? {
							connect: {
								id: input?.company?.id,
							},
					  }
					: undefined,
				users: {
					connect: {
						id: context.accountId,
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

	delete: DeleteClientUseCaseFn = async (id) =>
		!!this.clients.delete({ where: { id } })

	loadClients: LoadClientsUseCaseFn = async (params, context) => {
		const isAdminAccount =
			context?.accountId && roleValidation(context?.accountRole?.key!, "admin")

		const result = await this.clients.findMany({
			where:
				params?.filter || params?.search
					? {
							OR: [
								{
									status: {
										equals: params?.filter?.status,
									},
								},
								{
									id: {
										equals: params?.search,
									},
								},
								{
									code: {
										contains: params?.search,
									},
								},
								{
									name: {
										contains: params?.search,
									},
								},
							],
					  }
					: !isAdminAccount
					? {
							users: {
								some: {
									id: context?.accountId,
								},
							},
					  }
					: undefined,
			skip: params?.pagination?.skip,
			take: params?.pagination?.take,
			orderBy: !!params?.orderBy
				? {
						id:
							params?.orderBy?.key === "ID"
								? (params.orderBy.sort?.toLowerCase() as any)
								: undefined,
						code:
							params?.orderBy?.key === "CODE"
								? (params.orderBy.sort?.toLowerCase() as any)
								: undefined,
						name:
							params?.orderBy?.key === "NAME"
								? (params.orderBy.sort?.toLowerCase() as any)
								: undefined,
						createdAt:
							params?.orderBy?.key === "CREATEDAT"
								? (params.orderBy.sort?.toLowerCase() as any)
								: undefined,
				  }
				: {
						createdAt: "desc",
				  },
			include: {
				users: true,
				company: true,
			},
		})

		return {
			total: result.length,
			data: result,
		}
	}
}
