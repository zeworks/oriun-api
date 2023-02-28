import { ClientsEntity } from "@/domain/entities/clients"

export interface LoadClientByIdentificationNumberUseCase {
	loadByIdentificationNumber: LoadClientByIdentificationNumberUseCaseFn
}

export type LoadClientByIdentificationNumberUseCaseFn = (
	identificationNumber: string
) => Promise<LoadClientByIdentificationNumberUseCase.Result>

export namespace LoadClientByIdentificationNumberUseCase {
	export type Result = ClientsEntity | null
}
