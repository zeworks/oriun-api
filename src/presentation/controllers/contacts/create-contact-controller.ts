import { CreateContactUseCase } from "@/domain/usecases/contacts/create-contact";
import { badRequest, ok, serverError } from "@/presentation/helpers/http";
import { Controller } from "@/presentation/protocols/controller";
import { HttpResponse } from "@/presentation/protocols/http";
import { Validation } from "@/presentation/protocols/validation";

export class CreateContactController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createContact: CreateContactUseCase
  ) { }
  
  async execute(request: CreateContactUseCase.Params): Promise<HttpResponse<CreateContactUseCase.Result>> {
    const errors = this.validation.validate(request);

    if (errors)
      return badRequest(errors);
    
    try {
      const result = await this.createContact.create(request);
      return ok(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
