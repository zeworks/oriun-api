import { LoadDepartmentByNameUseCaseFunction } from "@/domain/usecases/departments/load-department-by-name";

export interface LoadDepartmentByNameRepository {
  loadByName: LoadDepartmentByNameUseCaseFunction
}
