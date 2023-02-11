import { DbLoadDepartments } from "@/data/usecases/departments/load-departments"
import { LoadDepartmentsUseCase } from "@/domain/usecases/departments/load-departments"
import { DepartmentsRepository } from "@/infra/db/prisma/repos/departments-repository"

export const makeLoadDepartmentsUseCase = (): LoadDepartmentsUseCase => {
	const departmentsRepository = new DepartmentsRepository()
	return new DbLoadDepartments(departmentsRepository)
}
