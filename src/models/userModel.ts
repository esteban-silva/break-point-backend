import { Roles } from "../schemes/rolScheme";
import { ScheduleClasses } from "../schemes/scheduleClassScheme";
import { UserPartialType, Users, UserType } from "../schemes/userScheme";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default class UserModel {
  static getById = async (id: number) => {
    const user = await Users.findByPk(id);
    return user?.dataValues;
  };

  static getAll = async () => {
    const allUsers = await Users.findAll({
      include: [
        { model: Roles, attributes: ["id", "name"] },
        { model: ScheduleClasses },
      ],
    });
    return allUsers;
  };

  static createUser = async (user: UserType) => {
    if (user.rolId) {
      const validRole = await Roles.findByPk(user.rolId);
      if (validRole) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await Users.create({
          ...user,
          password: hashedPassword,
        });
        return { message: "User created successfuly", data: newUser };
      } else {
        return { message: "User must contain a valid role" };
      }
    } else {
      return { message: "User must contain a role" };
    }
  };

  static deleteUser = async (id: number) => {
    const user = await Users.findByPk(id);
    if (user) {
      user.destroy();
      user?.save();
      return true;
    } else {
      return false;
    }
  };

  static updateUser = async (id: number, userToUpdate: UserPartialType) => {
    const user = await Users.findByPk(id);
    if (user) {
      let validRole = true;
      if (userToUpdate.rolId) {
        const usersRol = await Roles.findByPk(userToUpdate.rolId);
        if (!usersRol?.dataValues) validRole = false;
      }

      if (validRole) {
        user.update(userToUpdate);
        user.save();
        return { message: "User updated successfuly" };
      } else {
        return { message: "Users rol is invalid" };
      }
    } else {
      return { message: "User not found" };
    }
  };

  //Login
  static login = async (email: string, password: string) => {
    const user = await Users.scope('withPassword').findOne({ where: { email: email } });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.dataValues.password);
      if (isMatch) {
        const accessToken = this.createJwtToken(user.dataValues);
        return accessToken;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  static createJwtToken = (user: UserType) => {
    return jwt.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: "2h",
    });
  };
}
