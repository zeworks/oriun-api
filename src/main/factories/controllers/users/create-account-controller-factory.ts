import { CreateAccountController } from "@/presentation/controllers/users/create-account-controller"
import { makeCreateContactUseCase } from "../../usecases/contacts/create-contact-usecase-factory"
import { makeDbCreateAccountUseCase } from "../../usecases/users/create-account-usecase-factory"
import { makeCreateContactValidation } from "../contacts/create-contact-controller-validation"
import { makeCreateAccountValidation } from "./create-account-validation-factory"

export const makeCreateAccountController = () => {
	return new CreateAccountController(
		makeCreateAccountValidation(),
		makeCreateContactUseCase(),
		makeCreateContactValidation(),
		makeDbCreateAccountUseCase()
	)
}
