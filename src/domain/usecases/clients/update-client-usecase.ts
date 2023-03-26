import { ClientsEntity } from "@/domain/entities/clients"

export interface UpdateClientUseCase {
	update: UpdateClientUseCaseFn
}

export type UpdateClientUseCaseFn = (
	input: UpdateClientUseCase.Params
) => Promise<UpdateClientUseCase.Result>

export namespace UpdateClientUseCase {
	export type Params = Partial<ClientsEntity> & {
		id: string
	}

	export type Result = ClientsEntity | null
}
