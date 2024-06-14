import { Request, Response } from "express";
import { UserType, UserPartialType } from "../schemes/userScheme";
import UserModel from "../models/userModel";
import IApiResponse from "../interfaces/IApiResponse";
import { Model } from "sequelize";

export class UserController {
  userModel: any;
  constructor({ userModel }: { userModel: UserModel }) {
    this.userModel = userModel;
  }

  getAll = async (req: Request, res: Response) => {
    const response: IApiResponse = await this.userModel.getAll();
    return res.status(response.status).json(response);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response: IApiResponse = await this.userModel.getById(id);
    return res.status(response.status).json(response);
  };

  createCommonUser = async (req: Request, res: Response) => {
    const user: UserType = req.body;
    const response: IApiResponse = await this.userModel.createCommonUser(user);
    return res.status(response.status).json(response);
  };

  setUserTeacher = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const response: IApiResponse = await this.userModel.setUserTeacher(userId);
    return res.status(response.status).json(response);
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response: IApiResponse = await this.userModel.deleteUser(id);
    return res.status(response.status).json(response);
  };

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userToUpdate: UserPartialType = req.body;
    const response: IApiResponse = await this.userModel.updateUser(
      id,
      userToUpdate
    );
    return res.status(response.status).json(response);
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const response = await this.userModel.login(email, password);
    return res.status(response.status).json(response);
  };
}
