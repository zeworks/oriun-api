import { DbCreateAuthentication } from "@/data/usecases/authentication/create-authentication-usecase";
import { CreateAuthenticationUseCase } from "@/domain/usecases/authentication/create-authentication";
import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";
import { Validation } from "@/presentation/protocols/validation";

export class CreateAuthenticationController implements Controller {

  constructor(
    private readonly validation: Validation,
    private readonly createAuthentication: DbCreateAuthentication
  ) {}

  execute = async (request?: CreateAuthenticationController.Params, context?: any): Promise<HttpResponse<CreateAuthenticationController.Result>> => {
    
  };
}

export namespace CreateAuthenticationController {
  export type Params = CreateAuthenticationUseCase.Params;
  export type Result = CreateAuthenticationUseCase.Result;
}
