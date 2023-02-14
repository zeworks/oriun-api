import { DeleteDepartmentController } from "@/presentation/controllers/departments/delete-department-controller"
import { Controller } from "@/presentation/protocols/controller"
import { makeDeleteDepartmentUseCase } from "../../usecases/departments/delete-department-usecase-factory"
import { makeDeleteDepartmentValidation } from "./delete-department-controller-validation"

export const makeDeleteDepartmentController = (): Controller => {
	return new DeleteDepartmentController(
		makeDeleteDepartmentValidation(),
		makeDeleteDepartmentUseCase()
	)
}
