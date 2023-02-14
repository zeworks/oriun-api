import { CheckRoleByKeyRepository } from "@/data/protocols/repositories/roles/check-role-by-key-respository"
import { CreateRoleRepository } from "@/data/protocols/repositories/roles/create-role-repository"
import { LoadRoleByKeyRepository } from "@/data/protocols/repositories/roles/load-role-by-key-repository"
import { CreateRoleUseCase } from "@/domain/usecases/roles/create-role"
import { LoadRoleByKeyUseCaseFunction } from "@/domain/usecases/roles/load-role-by-key"
import { PrismaHelper } from "../prisma-helper"

export class RolesRepository
	implements
		CreateRoleRepository,
		CheckRoleByKeyRepository,
		LoadRoleByKeyRepository
{
	checkByKey = async (key: string): Promise<boolean> => {
		return !!(await PrismaHelper.getCollection("roles").findFirst({
			where: {
				key,
			},
		}))
	}

	loadByKey: LoadRoleByKeyUseCaseFunction = async (key) => {
		const result = await PrismaHelper.getCollection("roles").findFirst({
			where: {
				key,
			},
		})

		return result
	}

	create = async (
		params: CreateRoleUseCase.Params
	): Promise<CreateRoleUseCase.Result> => {
		return await PrismaHelper.getCollection("roles").create({
			data: {
				...params,
				permissions: {
					connect: [...(params.permissions || [])].map((permission) => ({
						id: permission.id,
					})),
				},
			},
			include: {
				permissions: true,
			},
		})
	}
}
