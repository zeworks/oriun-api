import { LoadAccountByEmailUseCaseFunction } from "@/domain/usecases/users/load-account-by-email"
import { LoadAccountByIdUseCaseFunction } from "@/domain/usecases/users/load-account-by-id"
import { LoadAccountByTokenUseCaseFunction } from "@/domain/usecases/users/load-account-by-token"
import { LoadAccountByUsernameUseCaseFunction } from "@/domain/usecases/users/load-account-by-username"
import { CreateAccountRepository } from "./create-account-repository"
import { LoadAccountByEmailRepository } from "./load-account-by-email-repository"
import { LoadAccountByIdRepository } from "./load-account-by-id-repository"
import { LoadAccountByTokenRepository } from "./load-account-by-token-repository"
import { LoadAccountByUsernameRepository } from "./load-account-by-username-repository"
import {
	UpdateTokenRepository,
	UpdateTokenRepositoryFunction,
} from "./update-token-repository"
import { LoadAccountsRepository } from "./load-accounts-repository"
import { LoadAccountsUseCaseFunction } from "@/domain/usecases/users/load-accounts"
import { DeleteAccountRepository } from "./delete-account-repository"
import { DeleteAccountUseCaseFn } from "@/domain/usecases/users/delete-account"
import { UpdateAccountRepository } from "./update-account-repository"
import { UpdateAccountUseCase } from "@/domain/usecases/users/update-account"
import { UsersEntity } from "@/domain/entities/users"
import { faker } from "@faker-js/faker"

export class InMemoryUsersRepository
	implements
		LoadAccountByEmailRepository,
		CreateAccountRepository,
		UpdateTokenRepository,
		LoadAccountByUsernameRepository,
		LoadAccountByTokenRepository,
		LoadAccountByIdRepository,
		LoadAccountsRepository,
		DeleteAccountRepository,
		UpdateAccountRepository
{
	users: UsersEntity[] = []

	loadByEmail: LoadAccountByEmailUseCaseFunction = async (email) => {
		const user = this.users.find((user) => user.email === email)
		return user || null
	}

	loadByUsername: LoadAccountByUsernameUseCaseFunction = async (username) => {
		const user = this.users.find((user) => user.username === username)
		return user || null
	}

	create = async (
		input: CreateAccountRepository.Params
	): Promise<CreateAccountRepository.Result> => {
		const data: CreateAccountRepository.Result = {
			...input,
			profile: {
				firstName: input?.profile?.firstName,
				lastName: input?.profile?.lastName,
				picture: input?.profile?.picture,
			},
			role: input?.role
				? {
						id: input?.role,
						key: `role_key_${input?.role}`,
						name: `Role name ${input?.role}`,
						status: true,
				  }
				: null,
			department: input?.department
				? {
						id: input?.department,
						name: `department name ${input?.department}`,
						status: true,
				  }
				: null,
			clients: input.clients?.map((c) => ({
				code: `CODE_${c.id}`,
				id: c.id,
				identificationNumber: `ID_NUMBER_${c.id}`,
				name: `NAME_${c.id}`,
			})),
		}

		this.users.push(data)
		if (!data) return null

		return {
			id: data.id || "",
			email: data.email,
			username: data.username,
			status: data.status,
			password: data.password,
			identificationNumber: data.identificationNumber,
			profile: data.profile,
			role: data.role,
			department: data.department,
			contact: data.contact,
			clients: data.clients,
		}
	}

	updateToken: UpdateTokenRepositoryFunction = async (
		userId,
		token
	): Promise<any> => {
		const user = this.users.find((u) => u.id === userId)

		if (!user) return null

		Object.assign(user, {
			accessToken: token,
		})

		return { accessToken: user.accessToken }
	}

	loadToken: LoadAccountByTokenUseCaseFunction = async (token) => {
		return this.users.find((u) => u.accessToken === token) || null
	}

	loadById: LoadAccountByIdUseCaseFunction = async (id) => {
		return this.users.find((u) => u.id === id) || null
	}

	loadAccounts: LoadAccountsUseCaseFunction = () => {
		return this.users as any
	}

	deleteAccount: DeleteAccountUseCaseFn = async (id) => {
		const success = this.users.find((u) => u.id === id)

		if (success) {
			this.users = this.users.filter((u) => u.id !== id)
			return true
		}

		return false
	}

	async updateAccount(
		id: string,
		input: UpdateAccountUseCase.Input
	): Promise<UpdateAccountUseCase.Result> {
		const user = this.users.find((u) => u.id === id)
		if (user) {
			return Object.assign<any, UsersEntity>(user, {
				...user,
				...input,
				username: input.username ?? user.username,
				profile: {
					...user.profile,
					...input.profile,
				},
				role: input.role
					? {
							id: input.role,
							key: faker.word.adjective(5),
							name: faker.word.verb(5),
					  }
					: user.role,
				department: input.department
					? {
							id: input.department,
							status: false,
							name: faker.word.verb(5),
					  }
					: user.department,
				clients: user.clients,
			})
		}

		return null
	}
}
