import { DepartmentsEntity } from "@/domain/entities/departments"

export type UpdateDepartmentUseCaseFunction = (
	input: UpdateDepartmentUseCase.Params
) => Promise<UpdateDepartmentUseCase.Result>

export interface UpdateDepartmentUseCase {
	update: UpdateDepartmentUseCaseFunction
}

export namespace UpdateDepartmentUseCase {
	export type Params = {
		id: string
		name?: string
		status?: boolean
	}

	export type Result = DepartmentsEntity | null
}
