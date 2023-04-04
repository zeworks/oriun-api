import { CreateAccountRepository } from "@/data/protocols/repositories/users/create-account-repository"
import { LoadAccountByEmailRepository } from "@/data/protocols/repositories/users/load-account-by-email-repository"
import { LoadAccountByIdRepository } from "@/data/protocols/repositories/users/load-account-by-id-repository"
import { LoadAccountByTokenRepository } from "@/data/protocols/repositories/users/load-account-by-token-repository"
import { LoadAccountByUsernameRepository } from "@/data/protocols/repositories/users/load-account-by-username-repository"
import {
	UpdateTokenRepository,
	UpdateTokenRepositoryFunction,
} from "@/data/protocols/repositories/users/update-token-repository"
import { LoadAccountByEmailUseCaseFunction } from "@/domain/usecases/users/load-account-by-email"
import { LoadAccountByIdUseCaseFunction } from "@/domain/usecases/users/load-account-by-id"
import { LoadAccountByTokenUseCaseFunction } from "@/domain/usecases/users/load-account-by-token"
import { LoadAccountByUsernameUseCaseFunction } from "@/domain/usecases/users/load-account-by-username"
import { PrismaHelper } from "../prisma-helper"
import { LoadAccountsRepository } from "@/data/protocols/repositories/users/load-accounts-repository"
import { LoadAccountsUseCaseFunction } from "@/domain/usecases/users/load-accounts"
import { DeleteAccountRepository } from "@/data/protocols/repositories/users/delete-account-repository"
import { DeleteAccountUseCaseFn } from "@/domain/usecases/users/delete-account"
import { UpdateAccountRepository } from "@/data/protocols/repositories/users/update-account-repository"
import { UpdateAccountUseCase } from "@/domain/usecases/users/update-account"
import { ContactsEntity } from "@/domain/entities/contacts"

export class UsersRepository
	implements
		LoadAccountByEmailRepository,
		CreateAccountRepository,
		LoadAccountByUsernameRepository,
		UpdateTokenRepository,
		LoadAccountByTokenRepository,
		LoadAccountByIdRepository,
		LoadAccountsRepository,
		DeleteAccountRepository,
		UpdateAccountRepository
{
	create = async (input: CreateAccountRepository.Params) => {
		const result = await PrismaHelper.getCollection("users").create({
			data: {
				email: input.email,
				id: input.id!,
				firstName: input.profile.firstName,
				password: input.password,
				username: input.username,
				lastName: input.profile.lastName,
				status: input.status,
				picture: input.profile.picture,
				identificationNumber: input.identificationNumber,
				contact: input.contact?.id
					? {
							connect: {
								id: (input.contact as ContactsEntity)?.id,
							},
					  }
					: undefined,
				department: input.department
					? {
							connect: {
								id: input.department,
							},
					  }
					: undefined,
				role: input.role
					? {
							connect: {
								id: input.role,
							},
					  }
					: undefined,
			},
			include: {
				contact: true,
				department: true,
				clients: {
					include: {
						company: true,
						contacts: true,
					},
				},
				role: {
					include: {
						permissions: true,
					},
				},
			},
		})

		if (result)
			return {
				id: result.id,
				email: result.email,
				password: result.password,
				username: result.username,
				roleId: result.role,
				status: result.status,
				identificationNumber: result.identificationNumber,
				profile: {
					firstName: result.firstName,
					lastName: result.lastName,
					picture: result.picture,
				},
				role: result.role,
				department: result.department,
				departmentId: result.department,
				contact: result.contact,
				contactId: result.contactId,
			}

		return null
	}
	loadByEmail: LoadAccountByEmailUseCaseFunction = async (email) => {
		return PrismaHelper.getCollection("users").findUnique({
			where: {
				email,
			},
		})
	}

	loadById: LoadAccountByIdUseCaseFunction = async (id) => {
		const result = await PrismaHelper.getCollection("users").findUnique({
			where: {
				id,
			},
			include: {
				contact: true,
				department: true,
				clients: {
					include: {
						company: true,
						contacts: true,
					},
				},
				role: {
					include: {
						permissions: true,
					},
				},
			},
		})

		if (!result) return null

		return {
			...result,
			profile: {
				firstName: result.firstName,
				lastName: result.lastName,
				picture: result.picture,
			},
		}
	}

	loadByUsername: LoadAccountByUsernameUseCaseFunction = async (username) => {
		return await PrismaHelper.getCollection("users").findUnique({
			where: {
				username,
			},
		})
	}

	updateToken: UpdateTokenRepositoryFunction = async (user_id, token) => {
		const result = await PrismaHelper.getCollection("users").update({
			data: {
				accessToken: token,
			},
			where: {
				id: user_id,
			},
		})

		if (result?.accessToken)
			return {
				accessToken: result.accessToken,
			}

		return null
	}

	loadToken: LoadAccountByTokenUseCaseFunction = async (token) => {
		const account = await PrismaHelper.getCollection("users").findFirst({
			where: {
				accessToken: token,
			},
			include: {
				contact: true,
				department: true,
				role: {
					include: {
						permissions: true,
					},
				},
			},
		})

		if (account)
			return {
				...account,
				profile: {
					firstName: account?.firstName,
					lastName: account?.lastName,
					picture: account?.picture,
				},
			}

		return null
	}

	loadAccounts: LoadAccountsUseCaseFunction = async () => {
		const result = await PrismaHelper.getCollection("users").findMany({
			include: {
				department: true,
				role: {
					include: {
						permissions: true,
					},
				},
			},
		})

		return result.map((res) => ({
			...res,
			profile: {
				firstName: res?.firstName,
				lastName: res?.lastName,
				picture: res?.picture,
			},
		}))
	}

	deleteAccount: DeleteAccountUseCaseFn = async (id) => {
		return !!(await PrismaHelper.getCollection("users").delete({
			where: {
				id,
			},
		}))
	}

	updateAccount = async (
		id: string,
		input: UpdateAccountUseCase.Input
	): Promise<UpdateAccountUseCase.Result> => {
		const result = await PrismaHelper.getCollection("users").update({
			where: {
				id,
			},
			data: {
				...(input as any),
				firstName: input?.profile?.firstName,
				lastName: input?.profile?.lastName,
				picture: input?.profile?.picture,
				contact: input.contact?.id
					? {
							connect: {
								id: (input.contact as ContactsEntity)?.id,
							},
					  }
					: undefined,
				department: input?.department
					? {
							connect: {
								id: input?.department,
							},
					  }
					: undefined,
				role: input?.role
					? {
							connect: {
								id: input?.role,
							},
					  }
					: undefined,
				clients: !!input.clients?.length
					? {
							connect: input?.clients?.map((c) => ({
								id: c.id,
							})),
					  }
					: undefined,
			},
			include: {
				contact: true,
				department: true,
				clients: {
					include: {
						company: true,
						contacts: true,
					},
				},
				role: {
					include: {
						permissions: true,
					},
				},
			},
		})

		if (result)
			return {
				...result,
				profile: {
					firstName: result.firstName,
					lastName: result.lastName,
					picture: result.picture,
				},
			}

		return null
	}
}
