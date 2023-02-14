import { DbDeleteDepartment } from "@/data/usecases/departments/delete-department"
import { DeleteDepartmentUseCase } from "@/domain/usecases/departments/delete-department"
import { DepartmentsRepository } from "@/infra/db/prisma/repos/departments-repository"

export const makeDeleteDepartmentUseCase = (): DeleteDepartmentUseCase => {
	const departmentsRepository = new DepartmentsRepository()
	return new DbDeleteDepartment(departmentsRepository, departmentsRepository)
}
