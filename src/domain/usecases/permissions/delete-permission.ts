export type DeletePermissionUseCase = (input: DeletePermissionUseCase.Params) => Promise<DeletePermissionUseCase.Result>

export namespace DeletePermissionUseCase {
  export type Params = {
    id: string;
  }

  export type Result = boolean | null;
}
