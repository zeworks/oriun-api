import { ContactsEntity } from "@/domain/entities/contacts"
import { CreateClientUseCase } from "@/domain/usecases/clients/create-client-usecase"
import { CreateContactUseCase } from "@/domain/usecases/contacts/create-contact"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import { Controller } from "@/presentation/protocols/controller"
import { HttpResponse } from "@/presentation/protocols/http"
import { Validation } from "@/presentation/protocols/validation"

export class CreateClientController implements Controller {
	constructor(
		private readonly createClientUseCase: CreateClientUseCase,
		private readonly createClientValidation: Validation,
		private readonly createContactUseCase: CreateContactUseCase,
		private readonly createContactValidation: Validation
	) {}

	execute: CreateClientControllerExecute = async (request) => {
		const contacts: Array<ContactsEntity> = []

		// validate request to create client
		const createClientValidationErrors =
			this.createClientValidation.validate(request)
		if (createClientValidationErrors)
			return badRequest(createClientValidationErrors)

		try {
			if (request?.contacts?.length) {
				for await (const contact of request.contacts) {
					// validate contact fields
					const createContactError =
						this.createContactValidation.validate(contact)
					if (createContactError) return badRequest(createContactError)
					// create contact
					const contactResponse = await this.createContactUseCase.create(
						contact
					)
					// add to array the contact created
					if (contactResponse) contacts.push(contactResponse)
				}
			}

			const clientResponse = await this.createClientUseCase.create({
				...request,
				contacts,
			})

			return ok(clientResponse)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace CreateClientController {
	export type Request = CreateClientUseCase.Input
	export type Result = CreateClientUseCase.Output
}

type CreateClientControllerExecute = (
	request: CreateClientController.Request
) => Promise<HttpResponse<CreateClientController.Result>>
