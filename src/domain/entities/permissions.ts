import { BaseEntity } from "./base";

export type PermissionsEntity = BaseEntity & {
  name: string;
  status: boolean;
  key: string;
  parent?: string | null;
}
