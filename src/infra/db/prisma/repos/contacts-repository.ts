import { CreateContactRepository } from "@/data/protocols/repositories/contacts/create-contact-repository";
import { CreateContactUseCase } from "@/domain/usecases/contacts/create-contact";
import { PrismaHelper } from "../prisma-helper";

export class ContactsRepository implements CreateContactRepository {
  async create(input: CreateContactRepository.Params): Promise<CreateContactUseCase.Result> {
    return PrismaHelper.getCollection("contacts").create({
      data: input
    })
  }
}
