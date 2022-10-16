import { DeleteDepartmentRepository } from "@/data/protocols/repositories/departments/delete-department";
import { LoadDepartmentByIdRepository } from "@/data/protocols/repositories/departments/load-department-by-id-repository";
import { DeleteDepartmentUseCase, DeleteDepartmentUseCaseFunction } from "@/domain/usecases/departments/delete-department";

export class DbDeleteDepartment implements DeleteDepartmentUseCase {
  constructor(
    private readonly loadDepartmentByIdRepository: LoadDepartmentByIdRepository,
    private readonly deleteDepartmentRepository: DeleteDepartmentRepository
  ) { }
  
  delete: DeleteDepartmentUseCaseFunction = async (id) => {
    try {
      const department = await this.loadDepartmentByIdRepository.loadById(id);

      if (!department)
        throw new Error("department id invalid");
    
      const data = await this.deleteDepartmentRepository.delete(id);
      return data;
    } catch (error) {
      throw error
    }
  }
}
