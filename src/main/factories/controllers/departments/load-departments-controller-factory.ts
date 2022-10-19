import { LoadDepartmentsController } from "@/presentation/controllers/departments/load-departments-controller";
import { Controller } from "@/presentation/protocols/controller";
import { makeLoadDepartmentsUseCase } from "../../usecases/departments/load-departments-usecase-factory";

export const makeLoadDepartmentsController = (): Controller => {
  return new LoadDepartmentsController(makeLoadDepartmentsUseCase())
}
