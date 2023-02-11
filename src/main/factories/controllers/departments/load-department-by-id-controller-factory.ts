import { LoadDepartmentByIdController } from "@/presentation/controllers/departments/load-department-by-id-controller"
import { Controller } from "@/presentation/protocols/controller"
import { makeLoadDepartmentByIdUseCase } from "../../usecases/departments/load-department-by-id-usecase-factory"
import { makeLoadDepartmentByIdValidation } from "./load-department-by-id-controller-validation"

export const makeLoadDepartmentByIdController = (): Controller => {
	return new LoadDepartmentByIdController(
		makeLoadDepartmentByIdValidation(),
		makeLoadDepartmentByIdUseCase()
	)
}
