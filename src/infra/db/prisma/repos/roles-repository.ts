import { CheckRoleByKeyRepository } from "@/data/protocols/repositories/roles/check-role-by-key-respository";
import { CreateRoleRepository } from "@/data/protocols/repositories/roles/create-role-repository";
import { CreateRoleUseCase } from "@/domain/usecases/roles/create-role";
import { PrismaHelper } from "../prisma-helper";

export class RolesRepository implements CreateRoleRepository, CheckRoleByKeyRepository {
  checkByKey = async (key: string): Promise<boolean> => {
    return !!await PrismaHelper.getCollection("roles").findFirst({
      where: {
        key
      }
    })
  }

  create = async (params: CreateRoleUseCase.Params): Promise<CreateRoleUseCase.Result> => {
    return await PrismaHelper.getCollection("roles").create({
      data: {
        ...params,
        permissions: {
          connect: [...params.permissions || []].map(permission => ({
            id: permission.id
          }))
        }
      },
      include: {
        permissions: true,
      }
    })
  }

}
