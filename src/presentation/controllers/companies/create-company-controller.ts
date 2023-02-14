import { ContactsEntity } from "@/domain/entities/contacts"
import { CreateCompanyUseCase } from "@/domain/usecases/companies/create-company"
import { CreateContactUseCase } from "@/domain/usecases/contacts/create-contact"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import { Controller } from "@/presentation/protocols/controller"
import { HttpResponse } from "@/presentation/protocols/http"
import { Validation } from "@/presentation/protocols/validation"

export namespace CreateCompanyController {
	export type Params = CreateCompanyUseCase.Params
	export type Result = CreateCompanyUseCase.Result
}

type CreateCompanyControllerFunction = (
	request: CreateCompanyController.Params
) => Promise<HttpResponse<CreateCompanyController.Result>>

export class CreateCompanyController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly contactsValidation: Validation,
		private readonly createContact: CreateContactUseCase,
		private readonly createCompany: CreateCompanyUseCase
	) {}

	execute: CreateCompanyControllerFunction = async (request) => {
		const contacts: Array<ContactsEntity> = []

		const errors = this.validation.validate(request)
		if (errors) return badRequest(errors)

		for (const contact of request.contacts || []) {
			const contactError = this.contactsValidation.validate(contact)

			if (contactError) return badRequest(contactError)

			const result = await this.createContact.create(contact)

			if (result) contacts.push(result)
		}

		try {
			const result = await this.createCompany.create({
				...request,
				contacts,
			})
			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}
