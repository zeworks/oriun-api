import { ClientsEntity } from "@/domain/entities/clients"

export interface LoadClientByIdUseCase {
	loadById: LoadClientByIdUseCaseFn
}

export type LoadClientByIdUseCaseFn = (
	id: string
) => Promise<LoadClientByIdUseCase.Result>

export namespace LoadClientByIdUseCase {
	export type Result = ClientsEntity | null
}
