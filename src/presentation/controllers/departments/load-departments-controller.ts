import { LoadDepartmentsUseCase } from "@/domain/usecases/departments/load-departments";
import { ok, serverError } from "@/presentation/helpers/http";
import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";

export class LoadDepartmentsController implements Controller {
  constructor(
    private readonly loadDepartments: LoadDepartmentsUseCase
  ) { }
  
  execute = async (request?: LoadDepartmentsController.Params, context?: any): Promise<HttpResponse<LoadDepartmentsUseCase.Result>> => {
    try {
      const result = await this.loadDepartments.loadDepartments(request);
      return ok(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace LoadDepartmentsController {
  export type Params = LoadDepartmentsUseCase.Params;
}
