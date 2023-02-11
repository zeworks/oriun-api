import { ContactsEntity } from "@/domain/entities/contacts"

export interface CreateContactUseCase {
	create: CreateContactUseCaseFunction
}

export type CreateContactUseCaseFunction = (
	input: CreateContactUseCase.Params
) => Promise<CreateContactUseCase.Result>

export namespace CreateContactUseCase {
	export type Params = Omit<ContactsEntity, "id">
	export type Result = ContactsEntity | null
}
