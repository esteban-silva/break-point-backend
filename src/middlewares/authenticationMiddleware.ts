import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserPartialType, UserType } from "../schemes/userScheme";

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserPartialType;
    if (user) {
      delete user.password;
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "Jwt invalid" });
    }
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};
