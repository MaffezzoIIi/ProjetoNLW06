import { getCustomRepository } from "typeorm"
import { TagRepository } from "../repositories/TagsRepository"

class CreateTagService {
  async execute(name: string) {
    const tagsRepository = getCustomRepository(TagRepository);

    if (!name) {
      throw new Error("Incorrect name!");
    }

    const tagAlreadyExist = await tagsRepository.findOne({
      name,
    });

    if (tagAlreadyExist) {
      throw new Error("Tag already exitsts!");
    }

    const tag = tagsRepository.create({
      name,
    });

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagService }