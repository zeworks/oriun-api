export type DeleteDepartmentUseCaseFunction = (id: string) => Promise<boolean>;

export interface DeleteDepartmentUseCase {
  delete: DeleteDepartmentUseCaseFunction
}
