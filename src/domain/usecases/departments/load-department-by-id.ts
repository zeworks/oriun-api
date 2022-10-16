import { DepartmentsEntity } from "@/domain/entities/departments";

export interface LoadDepartmentByIdUseCase {
  loadById: LoadDepartmentByIdUseCaseFunction
}

export namespace LoadDepartmentByIdUseCase {
  export type Result = DepartmentsEntity | null;
}

export type LoadDepartmentByIdUseCaseFunction = (id: string) => Promise<LoadDepartmentByIdUseCase.Result>;
