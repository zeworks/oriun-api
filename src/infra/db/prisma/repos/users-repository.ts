import { CreateAccountRepository } from "@/data/protocols/repositories/users/create-account-repository";
import { LoadAccountByEmailRepository } from "@/data/protocols/repositories/users/load-account-by-email-repository";
import { LoadAccountByIdRepository } from "@/data/protocols/repositories/users/load-account-by-id-repository";
import { LoadAccountByTokenRepository } from "@/data/protocols/repositories/users/load-account-by-token-repository";
import { LoadAccountByUsernameRepository } from "@/data/protocols/repositories/users/load-account-by-username-repository";
import { UpdateTokenRepository, UpdateTokenRepositoryFunction } from "@/data/protocols/repositories/users/update-token-repository";
import { CreateAccountUseCaseFunction } from "@/domain/usecases/users/create-account";
import { LoadAccountByEmailUseCaseFunction } from "@/domain/usecases/users/load-account-by-email";
import { LoadAccountByIdUseCaseFunction } from "@/domain/usecases/users/load-account-by-id";
import { LoadAccountByTokenUseCaseFunction } from "@/domain/usecases/users/load-account-by-token";
import { LoadAccountByUsernameUseCaseFunction } from "@/domain/usecases/users/load-account-by-username";
import { PrismaHelper } from "../prisma-helper";


export class UsersRepository implements LoadAccountByEmailRepository, CreateAccountRepository, LoadAccountByUsernameRepository, UpdateTokenRepository, LoadAccountByTokenRepository, LoadAccountByIdRepository {
  
  create: CreateAccountUseCaseFunction = async (input) => {
    
    const result = await PrismaHelper.getCollection("users").create({
      data: {
        email: input.email,
        id: input.id!,
        firstName: input.profile.firstName,
        password: input.password,
        username: input.username,
        lastName: input.profile.lastName,
        status: input.status,
        picture: input.profile.picture,
        identificationNumber: input.identificationNumber,
        department: input.department ? {
          connect: {
            id: input.department
          }
        } : undefined,
        role: input.role ? {
          connect: {
            id: input.role
          }
        } : undefined
      },
      include: {
        department: true,
        role: {
          include: {
            permissions: true
          }
        }
      }
    })

    if (result)
      return {
        id: result.id,
        email: result.email,
        password: result.password,
        username: result.username,
        roleId: result.role,
        status: result.status,
        identificationNumber: result.identificationNumber,
        profile: {
          firstName: result.firstName,
          lastName: result.lastName,
          picture: result.picture
        },
        role: result.role,
        department: result.department,
        departmentId: result.department
      }

    return null

  };
  loadByEmail: LoadAccountByEmailUseCaseFunction = async (email) => {
    return PrismaHelper.getCollection("users").findFirst({
      where: {
        email
      },
    })
  }

  loadById: LoadAccountByIdUseCaseFunction = async (id) => {
    const result = await PrismaHelper.getCollection("users").findFirst({
      where: {
        id
      },
      include: {
        department: true,
        role: {
          include: {
            permissions: true
          }
        }
      }
    })

    if (!result)
      return null

    return {
      ...result,
      profile: {
        firstName: result.firstName,
        lastName: result.lastName,
        picture: result.picture
      }
    }
  }

  loadByUsername: LoadAccountByUsernameUseCaseFunction = async (username) => {
    return await PrismaHelper.getCollection("users").findFirst({
      where: {
        username
      }
    })
  }

  updateToken: UpdateTokenRepositoryFunction = async (user_id, token) => {
    const result = await PrismaHelper.getCollection("users").update({
      data: {
        accessToken: token
      },
      where: {
        id: user_id
      }
    })

    if (result?.accessToken)
      return {
        accessToken: result.accessToken
      }

    return null
  }

  loadToken: LoadAccountByTokenUseCaseFunction = async (token) => {
    const account = await PrismaHelper.getCollection("users").findFirst({
      where: {
        accessToken: token,
      },
      include: {
        department: true,
        role: {
          include: {
            permissions: true
          }
        }
      }
    })

    if (account)
      return {
        ...account,
        profile: {
          firstName: account?.firstName,
          lastName: account?.lastName,
          picture: account?.picture,
        }
      }
    
    return null
  }
}
