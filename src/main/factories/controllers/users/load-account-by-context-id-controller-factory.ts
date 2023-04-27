import { Controller } from "@/presentation/protocols/controller"
import { makeLoadAccountByIdUseCase } from "../../usecases/users/load-account-by-id-usecase-factory"
import { LoadAccountByContextIdController } from "@/presentation/controllers/users/load-account-by-context-id-controller"

export const makeLoadAccountByContextIdController = (): Controller => {
	return new LoadAccountByContextIdController(makeLoadAccountByIdUseCase())
}
