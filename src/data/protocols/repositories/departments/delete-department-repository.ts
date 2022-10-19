import { DeleteDepartmentUseCaseFunction } from "@/domain/usecases/departments/delete-department";

export interface DeleteDepartmentRepository {
  delete: DeleteDepartmentUseCaseFunction
}
