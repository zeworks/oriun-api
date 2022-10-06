import { RolesEntity } from "@/domain/entities/roles";

export type CreateAccountUseCaseFunction = (input: CreateAccountUseCase.Params) => Promise<CreateAccountUseCase.Result>;

export interface CreateAccountUseCase {
  create: CreateAccountUseCaseFunction;
}

export namespace CreateAccountUseCase {
  export type Params = {
    id: string;
    username: string;
    email: string;
    status?: boolean;
    password?: string;
    identificationNumber?: string;
    role?: string;
    profile: {
      firstName: string;
      picture?: string;
      lastName?: string;
    }
  }

  export type Result = {
    id: string;
    username: string;
    email: string;
    status?: boolean;
    identificationNumber?: string | null;
    role?: RolesEntity | null;
    profile: {
      firstName: string;
      lastName?: string | null;
      picture?: string | null;
    }
  } | null;
}
