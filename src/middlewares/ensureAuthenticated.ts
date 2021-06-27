import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authtoken = request.headers.authorization

  if (!authtoken) {
    return response.status(401).end();
  }

  const [, token] = authtoken.split(" ");

  try {
    const { sub } = verify(
      token,
      "da83f5de2b8db218f1c4fa6783f9425f"
    ) as IPayLoad;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }

}