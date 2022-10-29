import { LoadCompanyByIdController } from "@/presentation/controllers/companies/load-company-by-id-controller";
import { Controller } from "@/presentation/protocols/controller";
import { makeLoadCompanyByIdUseCase } from "../../usecases/companies/load-company-by-id-usecase-factory";
import { makeLoadCompanyByIdValidation } from "./load-company-by-id-controller-validation";

export const makeLoadCompanyByIdController = (): Controller => {
  return new LoadCompanyByIdController(makeLoadCompanyByIdValidation(), makeLoadCompanyByIdUseCase())
}
