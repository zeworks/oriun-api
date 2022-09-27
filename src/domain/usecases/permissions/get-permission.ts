import { PermissionsEntity } from "../../entities/permissions";

export type GetPermissionByIdUseCase = (input: GetPermissionByIdUseCase.Params) => Promise<GetPermissionByIdUseCase.Result>;

export namespace GetPermissionByIdUseCase {
  export type Params = {
    id: string;
  }
  export type Result = PermissionsEntity | null;
}
