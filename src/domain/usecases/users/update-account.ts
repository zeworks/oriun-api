import { ClientsEntity } from "@/domain/entities/clients"
import { ContactsEntity } from "@/domain/entities/contacts"
import { UsersEntity, UsersProfileEntity } from "@/domain/entities/users"

export interface UpdateAccountUseCase {
	update: UpdateAccountUseCaseFn
}

export namespace UpdateAccountUseCase {
	export type Input = {
		username?: string | null
		password?: string | null
		identificationNumber?: string | null
		role?: string | null
		profile?: Partial<UsersProfileEntity>
		department?: string | null
		contact?: ContactsEntity | null
		clients?: Array<ClientsEntity>
	}
	export type Result = UsersEntity | null
}

export type UpdateAccountUseCaseFn = (
	id: string,
	input: UpdateAccountUseCase.Input
) => Promise<UpdateAccountUseCase.Result>
