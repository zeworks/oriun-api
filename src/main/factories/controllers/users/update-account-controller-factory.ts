import { UpdateAccountController } from "@/presentation/controllers/users/update-account-controller"
import { makeCreateContactUseCase } from "../../usecases/contacts/create-contact-usecase-factory"
import { makeUpdateContactUseCase } from "../../usecases/contacts/update-contact-usecase-factory"
import { makeUpdateAccountUseCase } from "../../usecases/users/update-account-usecase-factory"
import { makeCreateContactValidation } from "../contacts/create-contact-controller-validation"
import { makeUpdateContactValidation } from "../contacts/update-contact-controller-validation"

export const makeUpdateAccountController = () =>
	new UpdateAccountController(
		makeUpdateAccountUseCase(),
		makeCreateContactUseCase(),
		makeCreateContactValidation(),
		makeUpdateContactUseCase(),
		makeUpdateContactValidation()
	)
