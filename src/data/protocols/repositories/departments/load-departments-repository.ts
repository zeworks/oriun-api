import { LoadDepartmentsUseCaseFunction } from "@/domain/usecases/departments/load-departments";

export interface LoadDepartmentsRepository {
  loadDepartments: LoadDepartmentsUseCaseFunction
}
