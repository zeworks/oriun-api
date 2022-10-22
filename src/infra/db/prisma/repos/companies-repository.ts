import { CreateCompanyRepository } from "@/data/protocols/repositories/companies/create-company-repository";
import { CreateCompanyUseCase } from "@/domain/usecases/companies/create-company";
import { PrismaHelper } from "../prisma-helper";

export class CompaniesRepository implements CreateCompanyRepository {
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
}
