import { ContactsEntity } from "@/domain/entities/contacts"
import { CreateContactUseCase } from "@/domain/usecases/contacts/create-contact"
import { UpdateContactUseCase } from "@/domain/usecases/contacts/update-contact"
import { UpdateAccountUseCase } from "@/domain/usecases/users/update-account"
import { MissingParamError } from "@/presentation/errors/missing-param-error"
import { badRequest, ok, serverError } from "@/presentation/helpers/http"
import {
	Controller,
	ControllerProtocol,
} from "@/presentation/protocols/controller"
import { Validation } from "@/presentation/protocols/validation"

export class UpdateAccountController implements Controller {
	constructor(
		private readonly updateAccountUseCase: UpdateAccountUseCase,
		private readonly createContactUseCase: CreateContactUseCase,
		private readonly createContactValidation: Validation,
		private readonly updateContactUseCase: UpdateContactUseCase,
		private readonly updateContactValidation: Validation
	) {}

	execute: ControllerProtocol<
		UpdateAccountController.Input,
		UpdateAccountController.Result
	> = async (request) => {
		if (!request?.id) return badRequest(new MissingParamError("id"))
		try {
			// update account + update contact account
			if (request.input.contact) {
				let contactResult: ContactsEntity | null = null
				const { contact } = request.input

				// if there's no id, we need to create the contact to assign it
				// creating contact
				if (!contact.id) {
					const contactError = this.createContactValidation.validate(contact)
					if (contactError) return badRequest(contactError)

					contactResult =
						(await this.createContactUseCase.create(contact)) || null
				} else {
					// updating contact
					const contactError = this.updateContactValidation.validate(contact)
					if (contactError) return badRequest(contactError)

					contactResult =
						(await this.updateContactUseCase.update(contact)) || null
				}

				// update the user account
				const result = await this.updateAccountUseCase.update(request.id, {
					...request.input,
					contact: contactResult,
				})

				return ok(result)
			}
			// update only the account, without contact
			const result = await this.updateAccountUseCase.update(
				request.id,
				request.input
			)
			return ok(result)
		} catch (error: any) {
			return serverError(error)
		}
	}
}

export namespace UpdateAccountController {
	export type Input = {
		id: string
		input: UpdateAccountUseCase.Input
	}
	export type Result = UpdateAccountUseCase.Result
}
