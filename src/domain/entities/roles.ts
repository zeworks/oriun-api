import { BaseEntity } from "./base";
import { PermissionsEntity } from "./permissions";

export type RolesEntity = BaseEntity & {
  name: string;
  key: string;
  status?: boolean;
  permissions?: PermissionsEntity[];
}
