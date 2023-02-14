import { DepartmentsEntity } from "@/domain/entities/departments"

export interface LoadDepartmentsUseCase {
	loadDepartments: LoadDepartmentsUseCaseFunction
}

export namespace LoadDepartmentsUseCase {
	export type Params = {
		status?: boolean
	}
	export type Result = DepartmentsEntity[]
}

export type LoadDepartmentsUseCaseFunction = (
	params?: LoadDepartmentsUseCase.Params
) => Promise<LoadDepartmentsUseCase.Result>
