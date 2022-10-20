import { LoadAccountByIdUseCase } from "@/domain/usecases/users/load-account-by-id";
import { MissingParamError } from "@/presentation/errors/missing-param-error";
import { badRequest, ok, serverError } from "@/presentation/helpers/http";
import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";

export class LoadAccountByIdController implements Controller {

  constructor(
    private readonly loadAccountById: LoadAccountByIdUseCase
  ){}

  async execute(request?: any, context?: any): Promise<HttpResponse<LoadAccountByIdUseCase.Result>> {
    if (!context?.accountId)
      return badRequest(new MissingParamError("authorization"));
    
    try {
      const result = await this.loadAccountById.loadById(context?.accountId);

      return ok(result);
    } catch (error: any) {
      return serverError(error)
    }
  }
}
