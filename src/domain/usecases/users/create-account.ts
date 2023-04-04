import { ClientsEntity } from "@/domain/entities/clients"
import { ContactsEntity } from "@/domain/entities/contacts"
import { UsersEntity } from "@/domain/entities/users"

export type CreateAccountUseCaseFunction = (
	input: CreateAccountUseCase.Params
) => Promise<CreateAccountUseCase.Result>

export interface CreateAccountUseCase {
	create: CreateAccountUseCaseFunction
}

export namespace CreateAccountUseCase {
	export type Params = {
		username: string
		email: string
		status?: boolean
		password?: string
		identificationNumber?: string
		role?: string
		profile: {
			firstName: string
			picture?: string
			lastName?: string
		}
		department?: string
		contact?: ContactsEntity
		clients?: Array<ClientsEntity>
	}

	export type Result = UsersEntity | null
}
