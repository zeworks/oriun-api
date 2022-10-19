import { NameInUseError } from "@/data/errors/name-in-use-error";
import { Uuid } from "@/data/protocols/cryptography/uuid";
import { CreateDepartmentRepository } from "@/data/protocols/repositories/departments/create-department-repository";
import { LoadDepartmentByNameRepository } from "@/data/protocols/repositories/departments/load-department-by-name-repository";
import { CreateDepartmentUseCase, CreateDepartmentUseCaseFunction } from "@/domain/usecases/departments/create-department";

export class DbCreateDepartment implements CreateDepartmentUseCase {

  constructor(
    private readonly idAdapter: Uuid,
    private readonly loadDepartmentByNameRepository: LoadDepartmentByNameRepository,
    private readonly createDepartmentRepository: CreateDepartmentRepository
  ) {}

  create: CreateDepartmentUseCaseFunction = async (input) => {
    try {
      const alreadyExists = await this.loadDepartmentByNameRepository.loadByName(input.name);

      if (alreadyExists)
        throw new NameInUseError();

      const id = await this.idAdapter.generate();

      const data = await this.createDepartmentRepository.create({
        ...input,
        id
      });

      return data
    } catch (error) {
      throw error;
    }
  }
}
