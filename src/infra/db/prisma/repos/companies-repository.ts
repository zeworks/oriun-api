import { CreateCompanyRepository } from "@/data/protocols/repositories/companies/create-company-repository";
import { LoadCompaniesRepository } from "@/data/protocols/repositories/companies/load-companies-repository";
import { LoadCompanyByCodeRepository } from "@/data/protocols/repositories/companies/load-company-by-code-repository";
import { LoadCompanyByIdRepository } from "@/data/protocols/repositories/companies/load-company-by-id-repository";
import { UpdateCompanyRepository } from "@/data/protocols/repositories/companies/update-company-repository";
import { CreateCompanyUseCase } from "@/domain/usecases/companies/create-company";
import { LoadCompaniesUseCaseFunction } from "@/domain/usecases/companies/load-companies";
import { LoadCompanyByCodeUseCaseFunction } from "@/domain/usecases/companies/load-company-by-code";
import { LoadCompanyByIdUseCaseFunction } from "@/domain/usecases/companies/load-company-by-id";
import { UpdateCompanyUseCaseFunction } from "@/domain/usecases/companies/update-company";
import { PrismaHelper } from "../prisma-helper";

export class CompaniesRepository implements CreateCompanyRepository, LoadCompaniesRepository, LoadCompanyByIdRepository, LoadCompanyByCodeRepository, UpdateCompanyRepository {
  create = (input: CreateCompanyRepository.Params): Promise<CreateCompanyUseCase.Result> => {
    const contacts = input.contacts || [];

    return PrismaHelper.getCollection("companies").create({
      data: {
        ...input,
        createdAt: input.createdAt!,
        contacts: {
          connect: contacts?.map(contact => ({
            id: contact.id
          })),
        }
      },
      include: {
        contacts: true
      }
    })
  }

  loadCompanies: LoadCompaniesUseCaseFunction = async (params) => {
    return PrismaHelper.getCollection("companies").findMany({
      where: params?.filter || params?.search ? {
        OR: [
          {
            status: {
              equals: params?.filter?.status
            }
          },
          {
            id: {
              equals: params?.search
            }
          },
          {
            code: {
              contains: params?.search
            }
          },
          {
            name: {
              contains: params?.search
            }
          }
        ]
      } : undefined,
      skip: params?.pagination?.skip,
      take: params?.pagination?.take,
      orderBy: !!params?.orderBy ? {
        id: params?.orderBy?.key === "ID" ? params.orderBy.sort?.toLowerCase() as any : undefined,
        code: params?.orderBy?.key === "CODE" ? params.orderBy.sort?.toLowerCase() as any : undefined,
        name: params?.orderBy?.key === "NAME" ? params.orderBy.sort?.toLowerCase() as any : undefined,
        createdAt: params?.orderBy?.key === "CREATEDAT" ? params.orderBy.sort?.toLowerCase() as any : undefined,
      } : {
        createdAt: "desc"
      },
      include: {
        contacts: true
      }
    })
  }

  loadById: LoadCompanyByIdUseCaseFunction = async (id) => {
    const result = PrismaHelper.getCollection("companies").findFirst({
      where: {
        id
      },
      include: {
        contacts: true
      }
    })

    if (!result)
      return null;
    
    return result;
  }

  loadByCode: LoadCompanyByCodeUseCaseFunction = async (code) => {
    const result = PrismaHelper.getCollection("companies").findFirst({
      where: {
        code
      },
      include: {
        contacts: true
      }
    })

    if (!result)
      return null;

    return result;
  }

  update: UpdateCompanyUseCaseFunction = (input) => {
    const contacts = input.contacts || [];

    return PrismaHelper.getCollection("companies").update({
      data: {
        ...input,
        contacts: {
          connect: contacts?.map(contact => ({
            id: contact.id,
          }))
        }
      },
      where: {
        id: input.id
      },
      include: {
        contacts: true
      }
    })
  }
}
