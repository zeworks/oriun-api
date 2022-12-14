import { BaseEntity } from "./base";
import { DepartmentsEntity } from "./departments";
import { RolesEntity } from "./roles";

type UsersProfileEntity = {
  firstName: string;
  lastName?: string | null;
  picture?: string | null;
}
// TODO: add contacts relationship
export type UsersEntity = BaseEntity & {
  username: string;
  email: string;
  profile: UsersProfileEntity;
  status?: boolean | null;
  role?: RolesEntity | null;
  accessToken?: string | null;
  identificationNumber?: string | null;
  department?: DepartmentsEntity | null;
}
