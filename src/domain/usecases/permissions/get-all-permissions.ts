import { PermissionsEntity } from "../../entities/permissions";

export type GetAllPermissionsUseCase = () => Promise<GetAllPermissionsUseCase.Result>;

export namespace GetAllPermissionsUseCase {
  export type Result = PermissionsEntity[];
}
