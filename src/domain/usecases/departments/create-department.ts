export interface CreateDepartmentUseCase {
  create: CreateDepartmentUseCaseFunction
}

export namespace CreateDepartmentUseCase {
  export type Params = {
    id: string;
    name: string;
    status: boolean;
  }

  export type Result = {
    id: string;
    name: string;
    status: boolean;
    createdAt?: Date | null;
    updatedAt?: Date | null;
  } | null
}

export type CreateDepartmentUseCaseFunction = (input: CreateDepartmentUseCase.Params) => Promise<CreateDepartmentUseCase.Result>;
