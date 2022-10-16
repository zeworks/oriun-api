import { CreateDepartmentUseCaseFunction } from "@/domain/usecases/departments/create-department";

export interface CreateDepartmentRepository {
  create: CreateDepartmentUseCaseFunction;
}
