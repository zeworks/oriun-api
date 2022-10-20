import { RolesEntity } from "@/domain/entities/roles";
import { LoadAccountByTokenUseCase } from "@/domain/usecases/users/load-account-by-token";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { badRequest, forbidden, ok, serverError } from "../helpers/http";
import { HttpResponse } from "../protocols/http";
import { Middleware } from "../protocols/middleware";
import { Validation } from "../protocols/validation";

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByTokenUseCase,
    private readonly validation: Validation,
  ) { }
  
  async handle(request: AuthMiddleware.Params): Promise<HttpResponse<AuthMiddleware.Result>> {
    const errors = this.validation.validate(request);

    if (errors) return badRequest(errors);

    try {
      const account = await this.loadAccountByToken.loadToken(request.accessToken);

      if (account)
        return ok({
          accountId: account.id,
          accountRole: account.role
        });
      
      return forbidden(new UnauthorizedError());
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Params = {
    accessToken: string;
  }
  
  export type Result = {
    accountId: string;
    accountRole: RolesEntity;
  } | null
}
