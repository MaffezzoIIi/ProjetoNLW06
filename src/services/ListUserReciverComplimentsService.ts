import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository"



class ListUserReciverComplimentsService {

  async execute(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository)

    const compliments = await complimentsRepository.find({
      where: {
        user_reciver: user_id
      },
      relations: ["userSender", "userReciver", "tag"],
    });

    return compliments;
  }
}

export { ListUserReciverComplimentsService };