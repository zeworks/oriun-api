import { LoadAccountByIdController } from "@/presentation/controllers/users/load-account-by-id-controller"
import { Controller } from "@/presentation/protocols/controller"
import { makeLoadAccountByIdUseCase } from "../../usecases/users/load-account-by-id-usecase-factory"

export const makeLoadAccountByIdController = (): Controller => {
	return new LoadAccountByIdController(makeLoadAccountByIdUseCase())
}
