import { ClientsEntity } from "@/domain/entities/clients"

export interface LoadClientByCodeUseCase {
	loadByCode: LoadClientByCodeUseCaseFn
}

export type LoadClientByCodeUseCaseFn = (
	code: string
) => Promise<LoadClientByCodeUseCase.Result>

export namespace LoadClientByCodeUseCase {
	export type Result = ClientsEntity | null
}
