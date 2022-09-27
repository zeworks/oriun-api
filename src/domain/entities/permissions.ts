import { BaseEntity } from "./base";

export type PermissionsEntity = BaseEntity & {
  name: string;
  status: boolean;
  parent?: string;
}
