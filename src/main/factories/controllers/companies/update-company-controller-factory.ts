import { UpdateCompanyController } from "@/presentation/controllers/companies/update-company-controller"
import { Controller } from "@/presentation/protocols/controller"
import { makeUpdateCompanyUseCase } from "../../usecases/companies/update-company-usecase-factory"
import { makeUpdateCompanyValidation } from "./update-company-controller-validation"

export const makeUpdateCompanyController = (): Controller => {
	return new UpdateCompanyController(
		makeUpdateCompanyValidation(),
		makeUpdateCompanyUseCase()
	)
}
