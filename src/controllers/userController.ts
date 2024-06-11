import { Request, Response } from "express";
import { UserType, UserPartialType } from "../schemes/userScheme";
import UserModel from "../models/userModel";

export class UserController {
  userModel: any;
  constructor({ userModel }: { userModel: UserModel }) {
    this.userModel = userModel;
  }

  getAll = async (req: Request, res: Response) => {
    const users = await this.userModel.getAll();
    return res.status(200).json({ data: users });
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userModel.getById(id);
    if (user) {
      return res.status(200).json({ data: user });
    } else {
      return res.status(200).json({ message: "User not found" });
    }
  };

  createUser = async (req: Request, res: Response) => {
    const user: UserType = req.body;
    const response = await this.userModel.createUser(user);
    return res.status(200).json(response);
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const isUserDeleted = await this.userModel.deleteUser(id);
    if (isUserDeleted) {
      return res.status(200).json({ message: "User deleted successfuly" });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userToUpdate: UserPartialType = req.body;
    if (Object.keys(userToUpdate).length > 0) {
      const updatedUser = await this.userModel.updateUser(id, userToUpdate);
      if (updatedUser) {
        return res.status(200).json({ message: "User updated successfuly" });
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Must provide the User information to change" });
    }
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const accessToken = await this.userModel.login(email, password);
    if (!accessToken)
      return res.status(401).json({ message: "Invalid credentials" });
    return res.status(200).json({ accessToken: accessToken });
  };
}
