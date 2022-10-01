export interface CheckRoleByKeyUseCase {
  checkByKey: CheckRoleByKeyUseCaseFunction
}

export type CheckRoleByKeyUseCaseFunction = (input: CheckRoleByKeyUseCase.Params) => Promise<CheckRoleByKeyUseCase.Result>;

export namespace CheckRoleByKeyUseCase {
  export type Params = {
    key: string;
  }
  export type Result = boolean;
}
