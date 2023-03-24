import { ClientsEntity } from "@/domain/entities/clients"
import { CompaniesEntity } from "@/domain/entities/companies"
import { ContactsEntity } from "@/domain/entities/contacts"

export interface CreateClientUseCase {
	create: CreateClientUseCaseFn
}

export type CreateClientUseCaseFn = (
	input: CreateClientUseCase.Input
) => Promise<CreateClientUseCase.Output>

export namespace CreateClientUseCase {
	export type Input = {
		name: string
		code: string
		identificationNumber: string
		status?: boolean | null
		picture?: string | null
		company?: CompaniesEntity | null
		contacts?: Array<ContactsEntity> | null
	}
	export type Output = ClientsEntity | null
}
