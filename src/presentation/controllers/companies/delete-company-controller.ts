import { DeleteCompanyUseCase } from "@/domain/usecases/companies/delete-company";
import { badRequest, ok, serverError } from "@/presentation/helpers/http";
import { Controller, ControllerProtocol } from "@/presentation/protocols/controller";
import { Validation } from "@/presentation/protocols/validation";

export class DeleteCompanyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase
  ) { }
  
  execute: ControllerProtocol<DeleteCompanyController.Params, DeleteCompanyController.Result> = async (request) => {
    const errors = this.validation.validate(request);

    if (errors) return badRequest(errors);

    try {
      const result = await this.deleteCompanyUseCase.delete(request?.id!);
      return ok(result);
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace DeleteCompanyController {
  export type Params = {
    id: string;
  }

  export type Result = DeleteCompanyUseCase.Result;
}
