import { BaseEntity } from "./base";
import { RolesEntity } from "./roles";

type UsersProfileEntity = {
  firstName: string;
  lastName?: string;
  picture?: string;
}
// TODO: add departments relationship
// TODO: add contacts relationship
export type UsersEntity = BaseEntity & {
  username: string;
  email: string;
  profile: UsersProfileEntity;
  status?: boolean;
  role?: RolesEntity;
  accessToken?: string;
  identificationNumber?: string;
}
