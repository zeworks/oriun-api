import { LoadDepartmentsRepository } from "@/data/protocols/repositories/departments/load-departments-repository";
import { LoadDepartmentsUseCase, LoadDepartmentsUseCaseFunction } from "@/domain/usecases/departments/load-departments";

export class DbLoadDepartments implements LoadDepartmentsUseCase {

  constructor(
    private readonly loadDepartmentsRepository: LoadDepartmentsRepository
  ) {}
  
  loadDepartments: LoadDepartmentsUseCaseFunction = async () => {
    const data = await this.loadDepartmentsRepository.loadDepartments();

    if (data.length)
      return data;
    
    return [];
  }
}
