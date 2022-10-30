import { UpdateCompanyController } from "@/presentation/controllers/companies/update-company-controller";
import { Controller } from "@/presentation/protocols/controller";
import { makeUpdateCompanyUseCase } from "../../usecases/companies/update-company-usecase-factory";
import { makeCreateContactUseCase } from "../../usecases/contacts/create-contact-usecase-factory";
import { makeUpdateContactUseCase } from "../../usecases/contacts/update-contact-usecase-factory";
import { makeCreateContactValidation } from "../contacts/create-contact-controller-validation";
import { makeUpdateCompanyValidation } from "./update-company-controller-validation";

export const makeUpdateCompanyController = (): Controller => {
  return new UpdateCompanyController(
    makeUpdateCompanyValidation(),
    makeCreateContactValidation(),
    makeCreateContactUseCase(),
    makeUpdateContactUseCase(),
    makeUpdateCompanyUseCase()
  )
}
