import { DeleteCompanyController } from "@/presentation/controllers/companies/delete-company-controller"
import { Controller } from "@/presentation/protocols/controller"
import { makeDeleteCompanyUseCase } from "../../usecases/companies/delete-company-usecase-factory"
import { makeDeleteCompanyValidation } from "./delete-company-controller-validation"

export const makeDeleteCompanyController = (): Controller => {
	return new DeleteCompanyController(
		makeDeleteCompanyValidation(),
		makeDeleteCompanyUseCase()
	)
}
