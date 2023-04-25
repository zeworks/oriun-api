import { AccountContext } from "@/config/account-context"
import { ClientsEntity } from "@/domain/entities/clients"
import { Datatable } from "@/domain/types/datatable"

export interface LoadClientsUseCase {
	loadClients: LoadClientsUseCaseFn
}

export type LoadClientsUseCaseFn = (
	params?: LoadClientsUseCase.Params,
	context?: AccountContext
) => Promise<LoadClientsUseCase.Result>

type LoadClientsUseCaseFilter = {
	status?: boolean
}

type LoadClientsUseCasePagination = {
	skip?: number
	take?: number
}

type LoadClientsUseCaseOrderBy = {
	key: "ID" | "CODE" | "NAME" | "CREATEDAT"
	sort: "ASC" | "DESC"
}

export namespace LoadClientsUseCase {
	export type Params = {
		filter?: LoadClientsUseCaseFilter
		pagination?: LoadClientsUseCasePagination
		search?: string
		orderBy?: LoadClientsUseCaseOrderBy
	}
	export type Result = Datatable<ClientsEntity> | null
}
