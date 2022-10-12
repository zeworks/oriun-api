import { Validation } from '@/presentation/protocols/validation'
import { MissingParamError } from '@/presentation/errors/missing-param-error'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) { }

  // @ts-ignore
  validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}