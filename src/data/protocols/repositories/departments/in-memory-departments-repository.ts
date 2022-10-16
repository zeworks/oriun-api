import { DepartmentsEntity } from "@/domain/entities/departments";
import { CreateDepartmentUseCaseFunction } from "@/domain/usecases/departments/create-department";
import { DeleteDepartmentUseCaseFunction } from "@/domain/usecases/departments/delete-department";
import { LoadDepartmentByIdUseCaseFunction } from "@/domain/usecases/departments/load-department-by-id";
import { LoadDepartmentByNameUseCaseFunction } from "@/domain/usecases/departments/load-department-by-name";
import { LoadDepartmentsUseCaseFunction } from "@/domain/usecases/departments/load-departments";
import { UpdateDepartmentUseCaseFunction } from "@/domain/usecases/departments/update-department";
import { CreateDepartmentRepository } from "./create-department-repository";
import { DeleteDepartmentRepository } from "./delete-department";
import { LoadDepartmentByIdRepository } from "./load-department-by-id-repository";
import { LoadDepartmentByNameRepository } from "./load-department-by-name-repository";
import { LoadDepartmentsRepository } from "./load-departments-repository";
import { UpdateDepartmentRepository } from "./update-department";

export class InMemoryDepartmentsRepository implements CreateDepartmentRepository, LoadDepartmentByNameRepository, LoadDepartmentByIdRepository, LoadDepartmentsRepository, UpdateDepartmentRepository, DeleteDepartmentRepository {
  private departments: DepartmentsEntity[] = [];

  create: CreateDepartmentUseCaseFunction = async (input) => {
    const data: DepartmentsEntity = {
      ...input,
      createdAt: new Date(),
      status: input.status ?? true
    };
    this.departments.push(data);
    return data;
  };
  
  loadByName: LoadDepartmentByNameUseCaseFunction = async (name) => {
    return this.departments.find(d => d.name === name) || null;
  }

  loadById: LoadDepartmentByIdUseCaseFunction = async (id) => {
    return this.departments.find(d => d.id === id) || null;
  }
  
  update: UpdateDepartmentUseCaseFunction = async (input) => {
    const department = this.departments.find(d => d.id === input.id);

    if (department)
      return Object.assign(department, {
        ...department,
        ...input,
        updatedAt: new Date()
      });
    
    return null;
  }

  loadDepartments: LoadDepartmentsUseCaseFunction = async () => this.departments;

  delete: DeleteDepartmentUseCaseFunction = async (id) => {
    const department = this.departments.find(d => d.id === id);
    
    if (department) {
      // updates db
      Object.assign(department, {
        ...department,
        status: false,
        updatedAt: new Date()
      })

      return true;
    }
    
    return false;
  }
}
