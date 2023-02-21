import { DbUpdateCompany } from "@/data/usecases/companies/db-update-company"
import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact"
import { DbUpdateContact } from "@/data/usecases/contacts/db-update-contact"
import { ContactsEntity } from "@/domain/entities/contacts"
import { UpdateCompanyUseCase } from "@/domain/usecases/companies/update-company"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"
import { Validation } from "@/presentation/protocols/validation"

export class UpdateCompanyController implements Controller {
	constructor(
		private readonly companyValidation: Validation,
		private readonly createContactValidation: Validation,
		private readonly createContactUseCase: DbCreateContact,
		private readonly updateContactUseCase: DbUpdateContact,
		private readonly updateCompanyUseCase: DbUpdateCompany
	) {}

	execute: ControllerProtocol<
		UpdateCompanyController.Params,
		UpdateCompanyController.Result
	> = async (request) => {
		const contacts: Array<ContactsEntity> = []

		const errors = this.companyValidation.validate(request)

		if (errors) return badRequest(errors)

		for (const contact of request?.contacts || []) {
			let result

			// if there's no id, we should create a new contact to assign to this company
			if (!contact.id) {
				const contactError = this.createContactValidation.validate(contact)

				if (contactError) return badRequest(contactError)

				result = await this.createContactUseCase.create(contact)
			} else {
				result = await this.updateContactUseCase.update(contact)
			}

			if (result) contacts.push(result)
		}

		try {
			const result = await this.updateCompanyUseCase.update({
				...request!,
				contacts,
			})
			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace UpdateCompanyController {
	export type Params = UpdateCompanyUseCase.Params
	export type Result = UpdateCompanyUseCase.Result
}
