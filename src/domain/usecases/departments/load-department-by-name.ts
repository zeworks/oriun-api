import { DepartmentsEntity } from "@/domain/entities/departments";

export type LoadDepartmentByNameUseCaseFunction = (name: string) => Promise<LoadDepartmentByNameUseCase.Result>;

export interface LoadDepartmentByNameUseCase {
  loadByName: LoadDepartmentByNameUseCaseFunction
}

export namespace LoadDepartmentByNameUseCase {
  export type Result = DepartmentsEntity | null;
}
