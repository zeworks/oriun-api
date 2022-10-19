import { CreateDepartmentController } from "@/presentation/controllers/departments/create-department-controller";
import { Controller } from "@/presentation/protocols/controller";
import { makeCreateDepartmentUseCase } from "../../usecases/departments/create-department-usecase-factory";
import { makeCreateDepartmentValidation } from "./create-department-controller-validation";

export const makeCreateDepartmentController = (): Controller => {
  return new CreateDepartmentController(makeCreateDepartmentValidation(), makeCreateDepartmentUseCase())
}
