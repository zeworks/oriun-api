import { DbLoadDepartmentById } from "@/data/usecases/departments/load-department-by-id"
import { LoadDepartmentByIdUseCase } from "@/domain/usecases/departments/load-department-by-id"
import { DepartmentsRepository } from "@/infra/db/prisma/repos/departments-repository"

export const makeLoadDepartmentByIdUseCase = (): LoadDepartmentByIdUseCase => {
	const departmentsRepository = new DepartmentsRepository()
	return new DbLoadDepartmentById(departmentsRepository)
}
