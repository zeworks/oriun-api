import { LoadDepartmentByIdRepository } from "@/data/protocols/repositories/departments/load-department-by-id-repository"
import {
	LoadDepartmentByIdUseCase,
	LoadDepartmentByIdUseCaseFunction,
} from "@/domain/usecases/departments/load-department-by-id"

export class DbLoadDepartmentById implements LoadDepartmentByIdUseCase {
	constructor(
		private readonly loadDepartmentByIdRepository: LoadDepartmentByIdRepository
	) {}

	loadById: LoadDepartmentByIdUseCaseFunction = async (departmentId) => {
		try {
			const data = await this.loadDepartmentByIdRepository.loadById(
				departmentId
			)

			if (!data) throw new Error("department id invalid")

			return data
		} catch (error) {
			throw error
		}
	}
}
