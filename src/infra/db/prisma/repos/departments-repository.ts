import { CreateDepartmentRepository } from "@/data/protocols/repositories/departments/create-department-repository";
import { DeleteDepartmentRepository } from "@/data/protocols/repositories/departments/delete-department-repository";
import { LoadDepartmentByIdRepository } from "@/data/protocols/repositories/departments/load-department-by-id-repository";
import { LoadDepartmentByNameRepository } from "@/data/protocols/repositories/departments/load-department-by-name-repository";
import { LoadDepartmentsRepository } from "@/data/protocols/repositories/departments/load-departments-repository";
import { UpdateDepartmentRepository } from "@/data/protocols/repositories/departments/update-department-repository";
import { CreateDepartmentUseCaseFunction } from "@/domain/usecases/departments/create-department";
import { DeleteDepartmentUseCaseFunction } from "@/domain/usecases/departments/delete-department";
import { LoadDepartmentByIdUseCaseFunction } from "@/domain/usecases/departments/load-department-by-id";
import { LoadDepartmentByNameUseCaseFunction } from "@/domain/usecases/departments/load-department-by-name";
import { LoadDepartmentsUseCaseFunction } from "@/domain/usecases/departments/load-departments";
import { UpdateDepartmentUseCaseFunction } from "@/domain/usecases/departments/update-department";
import { PrismaHelper } from "../prisma-helper";

export class DepartmentsRepository implements CreateDepartmentRepository, LoadDepartmentsRepository, LoadDepartmentByNameRepository, LoadDepartmentByIdRepository, UpdateDepartmentRepository, DeleteDepartmentRepository {

  loadByName: LoadDepartmentByNameUseCaseFunction = (name) => {
    return PrismaHelper.getCollection("departments").findFirst({
      where: {
        name
      },
    })
  }

  loadById: LoadDepartmentByIdUseCaseFunction = (id) => {
    return PrismaHelper.getCollection("departments").findUnique({
      where: {
        id
      },
      include: {
        users: true
      }
    })
  }

  update: UpdateDepartmentUseCaseFunction = (input) => {
    return PrismaHelper.getCollection("departments").update({
      data: {
        name: input?.name,
        status: input?.status
      },
      where: {
        id: input.id
      },
      include: {
        users: true
      }
    })
  }

  create: CreateDepartmentUseCaseFunction = async (input) => {
    return PrismaHelper.getCollection("departments").create({
      data: {
        id: input.id!,
        name: input.name,
        status: input.status
      },
      include: {
        users: true
      }
    })
  }

  loadDepartments: LoadDepartmentsUseCaseFunction = async (params) => {
    return PrismaHelper.getCollection("departments").findMany({
      where: {
        status: params?.status
      }
    });
  }

  delete: DeleteDepartmentUseCaseFunction = async (id) => {
    const department = await PrismaHelper.getCollection("departments").delete({
      where: {
        id
      }
    });

    if (!department)
      return false;

    return true;
  }
}
