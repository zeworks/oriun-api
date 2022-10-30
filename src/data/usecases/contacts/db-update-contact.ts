import { LoadContactByIdRepository } from "@/data/protocols/repositories/contacts/load-contact-by-id-repository";
import { UpdateContactRepository } from "@/data/protocols/repositories/contacts/update-contact-repository";
import { UpdateContactUseCase, UpdateContactUseCaseFunction } from "@/domain/usecases/contacts/update-contact";

export class DbUpdateContact implements UpdateContactUseCase {
  constructor(
    private readonly loadContactByIdRepository: LoadContactByIdRepository,
    private readonly updateContactRepository: UpdateContactRepository
  ) { }
  
  update: UpdateContactUseCaseFunction = async (input) => {
    const contact = await this.loadContactByIdRepository.loadById(input.id);

    if (!contact)
      throw new Error("invalid contact id");
    
    const result = await this.updateContactRepository.update(input);
    return result;
  }
}
