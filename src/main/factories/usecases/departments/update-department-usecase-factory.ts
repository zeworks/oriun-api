import { DbUpdateDepartment } from "@/data/usecases/departments/update-department"
import { UpdateDepartmentUseCase } from "@/domain/usecases/departments/update-department"
import { DepartmentsRepository } from "@/infra/db/prisma/repos/departments-repository"

export const makeUpdateDepartmentUseCase = (): UpdateDepartmentUseCase => {
	const departmentsRepository = new DepartmentsRepository()
	return new DbUpdateDepartment(
		departmentsRepository,
		departmentsRepository,
		departmentsRepository
	)
}
