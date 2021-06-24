import { getCustomRepository } from "typeorm"

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository"

interface IAuthenticateRequest {
  email: string;
  password: string;

}

class AuthenticateUserService {

  async execute({ email, password }: IAuthenticateRequest) {

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      email
    }
    );

    if (!user) {
      throw new Error("Email/Password incorrect")
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect")
    }

    const token = sign(
      {
        email: user.email
      },
      "da83f5de2b8db218f1c4fa6783f9425f",
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return token;
  }

}

export { AuthenticateUserService }