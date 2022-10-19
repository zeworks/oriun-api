import { UpdateDepartmentController } from "@/presentation/controllers/departments/update-department-controller";
import { Controller } from "@/presentation/protocols/controller";
import { makeUpdateDepartmentUseCase } from "../../usecases/departments/update-department-usecase-factory";
import { makeUpdateDepartmentValidation } from "./update-department-controller-validation";

export const makeUpdateDepartmentController = (): Controller => { 
  return new UpdateDepartmentController(makeUpdateDepartmentValidation(), makeUpdateDepartmentUseCase())
}
