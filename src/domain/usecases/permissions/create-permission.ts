import { PermissionsEntity } from "../../entities/permissions";

export type CreatePermissionUseCase = (input: CreatePermissionUseCase.Params) => Promise<CreatePermissionUseCase.Result>

export namespace CreatePermissionUseCase {
  export type Params = {
    name: string;
    status: boolean;
    parent?: string;
  }

  export type Result = PermissionsEntity | null;
}
