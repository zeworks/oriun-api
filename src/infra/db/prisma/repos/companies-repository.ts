import { CreateCompanyRepository } from "@/data/protocols/repositories/companies/create-company-repository";
import { LoadCompaniesRepository } from "@/data/protocols/repositories/companies/load-companies-repository";
import { CreateCompanyUseCase } from "@/domain/usecases/companies/create-company";
import { LoadCompaniesUseCaseFunction } from "@/domain/usecases/companies/load-companies";
import { PrismaHelper } from "../prisma-helper";

export class CompaniesRepository implements CreateCompanyRepository, LoadCompaniesRepository {
  create = (input: CreateCompanyRepository.Params): Promise<CreateCompanyUseCase.Result> => {
    const contacts = input.contacts || [];

    return PrismaHelper.getCollection("companies").create({
      data: {
        ...input,
        createdAt: input.createdAt!,
        contacts: {
          connect: contacts?.map(contact => ({
            id: contact.id
          }))
        }
      },
      include: {
        contacts: true
      }
    })
  }

  loadCompanies: LoadCompaniesUseCaseFunction = async (params) => {
    return PrismaHelper.getCollection("companies").findMany({
      where: {
        OR: [
          {
            status: params?.filter?.status
          },
          {
            id: params?.search
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
      },
      skip: params?.pagination?.skip,
      take: params?.pagination?.take,
      include: {
        contacts: true
      }
    })
  }
}