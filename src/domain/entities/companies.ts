import { BaseEntity } from "./base";
import { ContactsEntity } from "./contacts";

export type CompaniesEntity = BaseEntity & {
  code: string;
  name: string;
  status?: boolean;
  vatNumber?: string | null;
  identificationNumber?: string | null;
  fiscalNumber?: string | null;
  contacts?: Array<ContactsEntity>;
}
