import { LoadCompaniesController } from "@/presentation/controllers/companies/load-companies-controller"
import { Controller } from "@/presentation/protocols/controller"
import { makeLoadCompaniesUseCase } from "../../usecases/companies/load-companies-usecase-factory"

export const makeLoadCompaniesController = (): Controller => {
	return new LoadCompaniesController(makeLoadCompaniesUseCase())
}
