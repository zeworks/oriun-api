import { DeleteDepartmentUseCase } from "@/domain/usecases/departments/delete-department";
import { badRequest, ok, serverError } from "@/presentation/helpers/http";
import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";
import { Validation } from "@/presentation/protocols/validation";

export class DeleteDepartmentController implements Controller {

  constructor(
    private readonly validation: Validation,
    private readonly deleteDepartment: DeleteDepartmentUseCase
  ) {}

  async execute(request: DeleteDepartmentController.Params): Promise<HttpResponse<DeleteDepartmentController.Result>> {
    const errors = this.validation.validate(request);

    if (errors)
      return badRequest(errors);
    
    try {
      const result = await this.deleteDepartment.delete(request.id);
      return ok(result);
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace DeleteDepartmentController {
  export type Params = {
    id: string;
  }

  export type Result = DeleteDepartmentUseCase.Result
}
