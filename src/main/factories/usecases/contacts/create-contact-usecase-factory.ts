import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact";
import { CreateContactUseCase } from "@/domain/usecases/contacts/create-contact";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { ContactsRepository } from "@/infra/db/prisma/repos/contacts-repository";

export const makeCreateContactUseCase = (): CreateContactUseCase => {
  const uuidAdapter = new UuidAdapter();
  const contactsRepository = new ContactsRepository();
  return new DbCreateContact(uuidAdapter, contactsRepository);
}
