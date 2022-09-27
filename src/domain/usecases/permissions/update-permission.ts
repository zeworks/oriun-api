import { PermissionsEntity } from "../../entities/permissions";

export type UpdatePermissionUseCase = (input: UpdatePermissionUseCase.Params) => Promise<UpdatePermissionUseCase.Result>

export namespace UpdatePermissionUseCase {
  export type Params = {
    id: string;
    name?: string;
    status?: boolean;
    parent?: string;
  }

  export type Result = PermissionsEntity;
}
