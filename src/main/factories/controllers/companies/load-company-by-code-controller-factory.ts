import { LoadCompanyByCodeController } from "@/presentation/controllers/companies/load-company-by-code-controller";
import { Controller } from "@/presentation/protocols/controller";
import { makeLoadCompanyByCodeUseCase } from "../../usecases/companies/load-company-by-code-usecase-factory";
import { makeLoadCompanyByCodeValidation } from "./load-company-by-code-controller-validation";

export const makeLoadCompanyByCodeController = (): Controller => {
  return new LoadCompanyByCodeController(makeLoadCompanyByCodeValidation(), makeLoadCompanyByCodeUseCase());
}
