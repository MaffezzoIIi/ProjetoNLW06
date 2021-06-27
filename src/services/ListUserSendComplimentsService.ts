import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository"
import { UserRepository } from "../repositories/UserRepository"



class ListUserSenderComplimentsService {

  async execute(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository)

    const compliments = await complimentsRepository.find({
      where: {
        user_sender: user_id,
      },
      relations: ["userSender", "userReciver", "tag"],
    });

    return compliments;
  }
}

export { ListUserSenderComplimentsService };