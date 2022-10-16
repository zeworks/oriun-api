import { LoadDepartmentByIdRepository } from "@/data/protocols/repositories/departments/load-department-by-id-repository";
import { UpdateDepartmentRepository } from "@/data/protocols/repositories/departments/update-department";
import { UpdateDepartmentUseCase, UpdateDepartmentUseCaseFunction } from "@/domain/usecases/departments/update-department";

export class DbUpdateDepartment implements UpdateDepartmentUseCase {

  constructor(
    private readonly loadDepartmentByIdRepository: LoadDepartmentByIdRepository,
    private readonly updateDepartmentRepository: UpdateDepartmentRepository
  ) {}
  
  update: UpdateDepartmentUseCaseFunction = async (input) => {
    try {
      const department = await this.loadDepartmentByIdRepository.loadById(input.id);

      if (!department)
        throw new Error("department id invalid")
      
      const data = await this.updateDepartmentRepository.update(input);

      return data;
    } catch (error) {
      throw error;
    }
    
  }
}
