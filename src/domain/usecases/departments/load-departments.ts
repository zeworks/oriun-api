import { DepartmentsEntity } from "@/domain/entities/departments";

export interface LoadDepartmentsUseCase {
  loadDepartments: LoadDepartmentsUseCaseFunction
}

export namespace LoadDepartmentsUseCase {
  export type Result = DepartmentsEntity[];
}

export type LoadDepartmentsUseCaseFunction = () => Promise<LoadDepartmentsUseCase.Result>;
