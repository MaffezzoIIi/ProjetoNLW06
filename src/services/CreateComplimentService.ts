import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository"
import { UserRepository } from "../repositories/UserRepository";

interface IComplimenteRequest {
  tag_id: string;
  user_sender: string;
  user_reciver: string;
  message: string;
}

class CreateComplimentService {

  async execute({ tag_id, user_sender, user_reciver, message }: IComplimenteRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const usersRepository = getCustomRepository(UserRepository);

    if (user_sender === user_reciver) {
      throw new Error("Incorrect User Reciver");
    }

    const userReciverExists = await usersRepository.findOne(user_reciver);

    if (!userReciverExists) {
      throw new Error("User Reciver does not exists!");
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_reciver,
      message,
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService }