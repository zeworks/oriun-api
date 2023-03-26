import { CreateContactController } from "@/presentation/controllers/contacts/create-contact-controller"
import { makeCreateContactUseCase } from "../../usecases/contacts/create-contact-usecase-factory"
import { makeCreateContactValidation } from "./create-contact-controller-validation"

export const makeCreateContactController = () => {
	return new CreateContactController(
		makeCreateContactUseCase(),
		makeCreateContactValidation()
	)
}
