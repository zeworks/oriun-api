import { CreateAccountController } from "@/presentation/controllers/users/create-account-controller"
import { makeDbCreateAccountUseCase } from "../../usecases/users/create-account-usecase-factory"
import { makeCreateAccountValidation } from "./create-account-validation-factory"

export const makeCreateAccountController = () => {
	return new CreateAccountController(
		makeCreateAccountValidation(),
		makeDbCreateAccountUseCase()
	)
}
