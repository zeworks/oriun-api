import { UpdateAccountController } from "@/presentation/controllers/users/update-account-controller"
import { makeUpdateAccountUseCase } from "../../usecases/users/update-account-usecase-factory"

export const makeUpdateAccountController = () =>
	new UpdateAccountController(makeUpdateAccountUseCase())
