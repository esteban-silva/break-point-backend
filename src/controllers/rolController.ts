import { Request, Response } from "express";
import { UserType, UserPartialType } from "../schemes/userScheme";
import rolModel from "../models/rolModel";
import { RolType } from "../schemes/rolScheme";
import dotenv from "dotenv";
dotenv.config();

export class RolController {
  rolModel: any;
  constructor({ rolModel }: { rolModel: rolModel }) {
    this.rolModel = rolModel;
  }

  getAll = async (req: Request, res: Response) => {
    try {
      console.log(
        "data?",
        process.env.DATABASE_NAME,
        process.env.DATABASE_USERNAME,
        process.env.DATABASE_PASSWORD
      );
      const roles = await this.rolModel.getAll();
      return res.status(200).json({ data: roles });
    } catch (error) {
      console.log('error...', error);
    }
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.rolModel.getById(id);
    if (user) {
      return res.status(200).json({ data: user });
    } else {
      return res.status(200).json({ message: "Rol not found" });
    }
  };

  createRol = async (req: Request, res: Response) => {
    const rol: RolType = req.body;
    const newRol: UserType = await this.rolModel.createRol(rol);
    return res
      .status(200)
      .json({ data: newRol, message: "Rol created successfuly" });
  };

  deleteRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const isRolDeleted = await this.rolModel.deleteRol(id);
    if (isRolDeleted) {
      return res.status(200).json({ message: "Rol deleted successfuly" });
    } else {
      return res.status(400).json({ message: "Rol not found" });
    }
  };

  updateRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const rolToUpdate: RolType = req.body;
    if (Object.keys(rolToUpdate).length > 0) {
      const updatedUser = await this.rolModel.updateRol(id, rolToUpdate);
      if (updatedUser) {
        return res.status(200).json({ message: "Rol updated successfuly" });
      } else {
        return res.status(400).json({ message: "Rol not found" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Must provide the Rol information to change" });
    }
  };
}
