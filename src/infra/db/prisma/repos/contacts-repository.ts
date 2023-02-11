import { CreateContactRepository } from "@/data/protocols/repositories/contacts/create-contact-repository"
import { LoadContactByIdRepository } from "@/data/protocols/repositories/contacts/load-contact-by-id-repository"
import { UpdateContactRepository } from "@/data/protocols/repositories/contacts/update-contact-repository"
import { CreateContactUseCase } from "@/domain/usecases/contacts/create-contact"
import { LoadContactByIdUseCaseFunction } from "@/domain/usecases/contacts/load-contact-by-id"
import { UpdateContactUseCaseFunction } from "@/domain/usecases/contacts/update-contact"
import { PrismaHelper } from "../prisma-helper"

export class ContactsRepository
	implements
		CreateContactRepository,
		UpdateContactRepository,
		LoadContactByIdRepository
{
	create(
		input: CreateContactRepository.Params
	): Promise<CreateContactUseCase.Result> {
		return PrismaHelper.getCollection("contacts").create({
			data: input,
		})
	}

	update: UpdateContactUseCaseFunction = (input) => {
		return PrismaHelper.getCollection("contacts").update({
			where: {
				id: input.id,
			},
			data: input,
		})
	}

	loadById: LoadContactByIdUseCaseFunction = (id) => {
		return PrismaHelper.getCollection("contacts").findFirst({
			where: {
				id,
			},
		})
	}
}
