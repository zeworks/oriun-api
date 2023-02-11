import { LoadDepartmentByIdUseCaseFunction } from "@/domain/usecases/departments/load-department-by-id"

export interface LoadDepartmentByIdRepository {
	loadById: LoadDepartmentByIdUseCaseFunction
}
