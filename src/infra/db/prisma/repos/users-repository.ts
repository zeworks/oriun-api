import { CreateAccountRepository } from "@/data/protocols/repositories/users/create-account-repository";
import { LoadAccountByEmailRepository } from "@/data/protocols/repositories/users/load-account-by-email-repository";
import { LoadAccountByUsernameRepository } from "@/data/protocols/repositories/users/load-account-by-username-repository";
import { UpdateTokenRepository, UpdateTokenRepositoryFunction } from "@/data/protocols/repositories/users/update-token-repository";
import { CreateAccountUseCaseFunction } from "@/domain/usecases/users/create-account";
import { LoadAccountByEmailUseCaseFunction } from "@/domain/usecases/users/load-account-by-email";
import { LoadAccountByUsernameUseCaseFunction } from "@/domain/usecases/users/load-account-by-username";
import { PrismaHelper } from "../prisma-helper";


export class UsersRepository implements LoadAccountByEmailRepository, CreateAccountRepository, LoadAccountByUsernameRepository, UpdateTokenRepository {
  
  create: CreateAccountUseCaseFunction = async (input) => {
    
    const result = await PrismaHelper.getCollection("users").create({
      data: {
        email: input.email,
        id: input.id,
        firstName: input.profile.firstName,
        password: input.password,
        username: input.username,
        lastName: input.profile.lastName,
        status: input.status,
        picture: input.profile.picture,
        identificationNumber: input.identificationNumber,
        role: input.role ? {
          connect: {
            id: input.role
          }
        } : undefined
      },
      include: {
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
        role: result.role
      }

    return null

  };
  loadByEmail: LoadAccountByEmailUseCaseFunction = async (email) => {
    return await PrismaHelper.getCollection("users").findFirst({
      where: {
        email
      }
    })
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
}
