import { LoadDepartmentByNameRepository } from "@/data/protocols/repositories/departments/load-department-by-name-repository"
import {
	LoadDepartmentByNameUseCase,
	LoadDepartmentByNameUseCaseFunction,
} from "@/domain/usecases/departments/load-department-by-name"

export class DbLoadDepartmentByName implements LoadDepartmentByNameUseCase {
	constructor(
		private readonly loadDepartmentByNameRepository: LoadDepartmentByNameRepository
	) {}

	loadByName: LoadDepartmentByNameUseCaseFunction = async (departmentName) => {
		try {
			const data = await this.loadDepartmentByNameRepository.loadByName(
				departmentName
			)

			if (!data) throw new Error("department name invalid")

			return data
		} catch (error) {
			throw error
		}
	}
}
