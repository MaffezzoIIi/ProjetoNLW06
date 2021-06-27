import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";



class ListUserService {

  async execute() {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find();

    return classToPlain(users);
  }
}

export { ListUserService };