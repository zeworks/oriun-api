import { RolesEntity } from "@/domain/entities/roles"

export type LoadRoleByKeyUseCaseFunction = (key?: string) => Promise<LoadRoleByKeyUseCase.Result>

export interface LoadRoleByKeyUseCase {
  loadByKey: LoadRoleByKeyUseCaseFunction
}

export namespace LoadRoleByKeyUseCase {
  export type Result = RolesEntity | null;
}
