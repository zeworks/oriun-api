import { ContactsEntity } from "@/domain/entities/contacts"
import { DepartmentsEntity } from "@/domain/entities/departments"
import { RolesEntity } from "@/domain/entities/roles"

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
	}

	export type Result = {
		id: string
		username: string
		email: string
		status?: boolean
		identificationNumber?: string | null
		role?: RolesEntity | null
		password?: string | null
		profile: {
			firstName: string
			lastName?: string | null
			picture?: string | null
		}
		department?: DepartmentsEntity | null
		contact?: ContactsEntity | null
	} | null
}
