import { DbCreateDepartment } from "@/data/usecases/departments/create-department"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { DepartmentsRepository } from "@/infra/db/prisma/repos/departments-repository"

export const makeCreateDepartmentUseCase = () => {
	const uuidAdapter = new UuidAdapter()
	const departmentsRepository = new DepartmentsRepository()
	return new DbCreateDepartment(
		uuidAdapter,
		departmentsRepository,
		departmentsRepository
	)
}
