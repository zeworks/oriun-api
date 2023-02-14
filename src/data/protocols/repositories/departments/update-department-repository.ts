import { UpdateDepartmentUseCaseFunction } from "@/domain/usecases/departments/update-department"

export interface UpdateDepartmentRepository {
	update: UpdateDepartmentUseCaseFunction
}
