import { Validation } from "@/presentation/protocols/validation"
import { RequiredFieldValidation } from "@/validation/validators/required-field-validation"
import { ValidationComposite } from "@/validation/validators/validation-composite"

export const makeCreateContactValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ["name", "phone", "prefix", "country", "default"]) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
