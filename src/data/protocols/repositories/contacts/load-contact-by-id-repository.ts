import { LoadContactByIdUseCaseFunction } from "@/domain/usecases/contacts/load-contact-by-id";

export interface LoadContactByIdRepository {
  loadById: LoadContactByIdUseCaseFunction
}
