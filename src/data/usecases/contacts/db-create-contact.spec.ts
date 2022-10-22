import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { expect, test } from "vitest";
import { DbCreateContact } from "./db-create-contact";

test("Should create contact with success", async () => {
  const uuidAdapter = new UuidAdapter();
  const contactsRepository = new InMemoryContactsRepository();
  const createContact = new DbCreateContact(uuidAdapter, contactsRepository);

  const result = await createContact.create({
    country: "Portugal",
    default: true,
    name: "Contact Name",
    phone: "928322345",
    prefix: "+351",
  });

  expect(result?.country).toEqual("Portugal");
})
