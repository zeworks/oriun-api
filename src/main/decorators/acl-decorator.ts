import { PermissionsEntity } from "@/domain/entities/permissions";
import { RolesEntity } from "@/domain/entities/roles";
import { UnauthorizedError } from "@/presentation/errors/unauthorized-error";
import { serverError } from "@/presentation/helpers/http";
import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";

export class AclDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly permission: string
  ) { }

  async execute(request?: any, context?: any): Promise<HttpResponse<any>> {
    const role = (context.accountRole as RolesEntity);
    const permissionFound = role?.permissions?.find((p: any) => p.key === this.permission);

    const isPermissionActive = permissionFound && permissionFound.status || false;
    const isRoleActive = role?.status || false;

    if (isRoleActive && isPermissionActive)
      return this.controller.execute(request, context);

    return serverError(new UnauthorizedError())
  }
}
