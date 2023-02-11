import { DepartmentsEntity } from "@/domain/entities/departments"
import { CreateDepartmentUseCaseFunction } from "@/domain/usecases/departments/create-department"
import { DeleteDepartmentUseCaseFunction } from "@/domain/usecases/departments/delete-department"
import { LoadDepartmentByIdUseCaseFunction } from "@/domain/usecases/departments/load-department-by-id"
import { LoadDepartmentByNameUseCaseFunction } from "@/domain/usecases/departments/load-department-by-name"
import { LoadDepartmentsUseCaseFunction } from "@/domain/usecases/departments/load-departments"
import { UpdateDepartmentUseCaseFunction } from "@/domain/usecases/departments/update-department"
import { v4 } from "uuid"
import { CreateDepartmentRepository } from "./create-department-repository"
import { DeleteDepartmentRepository } from "./delete-department-repository"
import { LoadDepartmentByIdRepository } from "./load-department-by-id-repository"
import { LoadDepartmentByNameRepository } from "./load-department-by-name-repository"
import { LoadDepartmentsRepository } from "./load-departments-repository"
import { UpdateDepartmentRepository } from "./update-department-repository"

export class InMemoryDepartmentsRepository
	implements
		CreateDepartmentRepository,
		LoadDepartmentByNameRepository,
		LoadDepartmentByIdRepository,
		LoadDepartmentsRepository,
		UpdateDepartmentRepository,
		DeleteDepartmentRepository
{
	private departments: DepartmentsEntity[] = []

	create: CreateDepartmentUseCaseFunction = async (input) => {
		const data: DepartmentsEntity = {
			...input,
			id: v4(),
			createdAt: new Date(),
			status: input.status ?? true,
		}
		this.departments.push(data)
		return data
	}

	loadByName: LoadDepartmentByNameUseCaseFunction = async (name) => {
		return this.departments.find((d) => d.name === name) || null
	}

	loadById: LoadDepartmentByIdUseCaseFunction = async (id) => {
		return this.departments.find((d) => d.id === id) || null
	}

	update: UpdateDepartmentUseCaseFunction = async (input) => {
		const department = this.departments.find((d) => d.id === input.id)

		if (department)
			return Object.assign(department, {
				...department,
				...input,
				updatedAt: new Date(),
			})

		return null
	}

	loadDepartments: LoadDepartmentsUseCaseFunction = async (params) => {
		if (params?.status !== undefined)
			return this.departments.filter(
				(department) => department.status === params?.status
			)

		return this.departments
	}

	delete: DeleteDepartmentUseCaseFunction = async (id) => {
		const departmentFound = this.departments.find((d) => d.id === id)

		if (departmentFound) {
			this.departments = this.departments.filter(
				(s) => s.id !== departmentFound.id
			)

			return true
		}

		return false
	}
}
