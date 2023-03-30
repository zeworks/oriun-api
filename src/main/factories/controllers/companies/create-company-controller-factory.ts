import { CreateCompanyController } from "@/presentation/controllers/companies/create-company-controller"
import { Controller } from "@/presentation/protocols/controller"
import { makeCreateCompanyUseCase } from "../../usecases/companies/create-company-usecase-factory"
import { makeCreateCompanyValidation } from "./create-company-controller-validation"

export const makeCreateCompanyController = (): Controller => {
	return new CreateCompanyController(
		makeCreateCompanyValidation(),
		makeCreateCompanyUseCase()
	)
}
