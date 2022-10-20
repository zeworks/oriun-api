import { UpdateDepartmentUseCase } from "@/domain/usecases/departments/update-department";
import { badRequest, ok, serverError } from "@/presentation/helpers/http";
import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";
import { Validation } from "@/presentation/protocols/validation";

export class UpdateDepartmentController implements Controller {

  constructor(
    private readonly validation: Validation,
    private readonly updateDepartment: UpdateDepartmentUseCase
  ){}

  execute = async (request: UpdateDepartmentController.Params): Promise<HttpResponse<UpdateDepartmentController.Result>> => {
    const errors = this.validation.validate(request);

    if (errors)
      return badRequest(errors);
    
    try {
      const result = await this.updateDepartment.update({
        id: request.id,
        ...request.input
      });
      return ok(result);
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace UpdateDepartmentController {
  export type Params = {
    id: string;
    input?: {
      name?: string;
      status?: boolean;
    }
  }

  export type Result = UpdateDepartmentUseCase.Result
}
