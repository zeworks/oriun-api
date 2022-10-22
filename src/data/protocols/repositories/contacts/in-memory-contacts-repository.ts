import { ContactsEntity } from "@/domain/entities/contacts";
import { CreateContactUseCase } from "@/domain/usecases/contacts/create-contact";
import { CreateContactRepository } from "./create-contact-repository";

export class InMemoryContactsRepository implements CreateContactRepository {
  private contacts: ContactsEntity[] = [];
  
  async create(input: CreateContactRepository.Params): Promise<CreateContactUseCase.Result> {
    const data = {
      ...input,
      createdAt: new Date()
    }
    this.contacts.push(data);
    return data;
  }
}
