import { NameInUseError } from "@/data/errors/name-in-use-error"
import { LoadDepartmentByIdRepository } from "@/data/protocols/repositories/departments/load-department-by-id-repository"
import { LoadDepartmentByNameRepository } from "@/data/protocols/repositories/departments/load-department-by-name-repository"
import { UpdateDepartmentRepository } from "@/data/protocols/repositories/departments/update-department-repository"
import {
	UpdateDepartmentUseCase,
	UpdateDepartmentUseCaseFunction,
} from "@/domain/usecases/departments/update-department"

export class DbUpdateDepartment implements UpdateDepartmentUseCase {
	constructor(
		private readonly loadDepartmentByIdRepository: LoadDepartmentByIdRepository,
		private readonly loadDepartmentByNameRepository: LoadDepartmentByNameRepository,
		private readonly updateDepartmentRepository: UpdateDepartmentRepository
	) {}

	update: UpdateDepartmentUseCaseFunction = async (input) => {
		try {
			const department = await this.loadDepartmentByIdRepository.loadById(
				input.id
			)

			if (!department) throw new Error("department id invalid")

			if (input?.name) {
				const alreadyExists =
					await this.loadDepartmentByNameRepository.loadByName(input.name)

				if (alreadyExists) throw new NameInUseError()
			}

			const data = await this.updateDepartmentRepository.update(input)

			return data
		} catch (error) {
			throw error
		}
	}
}
