import { PermissionsEntity } from "../../entities/permissions";
import { RolesEntity } from "../../entities/roles";

export type CreateRoleUseCase = (input: CreateRoleUseCase.Params) => Promise<CreateRoleUseCase.Result>;

export namespace CreateRoleUseCase {
  export type Params = {
    id: string;
    key: string;
    name: string;
    status?: boolean;
    permissions?: PermissionsEntity[]; // TODO: for now...
  }

  export type Result = RolesEntity | null;
}
