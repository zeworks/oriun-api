import { CreateRoleUseCase } from "@/domain/usecases/roles/create-role"

export interface CreateRoleRepository {
	create: (
		params: CreateRoleRepository.Params
	) => Promise<CreateRoleRepository.Result>
}

export namespace CreateRoleRepository {
	export type Params = CreateRoleUseCase.Params
	export type Result = CreateRoleUseCase.Result
}
