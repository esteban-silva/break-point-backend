import { Roles } from "../schemes/rolScheme";
import { ScheduleClasses } from "../schemes/scheduleClassScheme";
import { IUser, UserPartialType, Users, UserType } from "../schemes/userScheme";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import IApiResponse from "../interfaces/IApiResponse";
dotenv.config();

export default class UserModel {
  static getById = async (id: number): Promise<IApiResponse> => {
    try {
      const user = await Users.findByPk(id);
      return {
        data: user?.dataValues,
        message: "User retrieved successfully",
        status: 200,
      };
    } catch (error) {
      return {
        data: error,
        message: "Error retrieving user",
        status: 500,
      };
    }
  };

  static getAll = async (): Promise<IApiResponse> => {
    try {
      const allUsers = await Users.findAll({
        include: [
          { model: Roles, attributes: ["id", "name"] },
          { model: ScheduleClasses },
        ],
      });
      return {
        data: allUsers,
        message: "All users retrieved successfully",
        status: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: "Error retrieving all users",
        status: 500,
      };
    }
  };

  static createCommonUser = async (user: UserType): Promise<IApiResponse> => {
    try {
      if (
        !user.ci ||
        !user.email ||
        !user.password ||
        !user.name ||
        !user.lastName
      ) {
        return { data: null, status: 400, message: "Missing fields" };
      }
      const userByEmail = await Users.findOne({ where: { email: user.email } });
      const userByCI = await Users.findOne({ where: { ci: user.ci } });
      if (userByCI || userByEmail) {
        return { data: null, status: 400, message: "User already exists" };
      }

      const rol = await Roles.findOne({ where: { name: "common" } });
      if (rol) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await Users.create({
          ...user,
          rolId: rol.dataValues.id,
          password: hashedPassword,
        });
        return {
          status: 201,
          message: "User created successfuly",
          data: newUser,
        };
      } else {
        return { data: null, status: 400, message: "Rol not found" };
      }
    } catch (error) {
      return { data: null, status: 500, message: "Error creating user" };
    }
  };

  static setUserTeacher = async (userId: number): Promise<IApiResponse> => {
    try {
      const rol = await Roles.findOne({ where: { name: "teacher" } });
      if (rol) {
        const user = await Users.findByPk(userId);
        if (user) {
          user.update({
            rolId: rol.dataValues.id,
            isTeacher: true,
          });
          return {
            status: 200,
            message: "User updated successfuly",
            data: user,
          };
        } else {
          return { data: null, status: 400, message: "User not found" };
        }
      } else {
        return { data: null, status: 400, message: "Rol not found" };
      }
    } catch (error) {
      return { data: error, status: 500, message: "Error updating user" };
    }
  };

  static deleteUser = async (id: number): Promise<IApiResponse> => {
    try {
      const user = await Users.findByPk(id);
      if (user) {
        user.destroy();
        user?.save();
        return { data: null, status: 200, message: "User deleted successfuly" };
      } else {
        return { data: null, status: 400, message: "User not found" };
      }
    } catch (error) {
      return { data: error, status: 500, message: "Error deleting user" };
    }
  };

  static updateUser = async (
    id: number,
    userToUpdate: UserPartialType
  ): Promise<IApiResponse> => {
    try {
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
          return {
            message: "User updated successfuly",
            data: user,
            status: 200,
          };
        } else {
          return { message: "Users rol is invalid", status: 400, data: null };
        }
      } else {
        return { message: "User not found", status: 400, data: null };
      }
    } catch (error) {
      return { message: "Error updating user", status: 500, data: error };
    }
  };

  static getCurrentUser = async ({
    id,
  }: {
    id: number;
  }): Promise<IApiResponse> => {
    console.warn("id DEL USER LOGUEADO", id);
    try {
      const user = await Users.findByPk(id);
      if (user) {
        const userWithoutPassword: Partial<IUser> = { ...user.dataValues };
        delete userWithoutPassword["password"];
        return {
          message: "User retrieved successfuly",
          status: 200,
          data: userWithoutPassword,
        };
      } else {
        return { message: "User not found", status: 400, data: null };
      }
    } catch (error) {
      return { message: "Error retrieving user", status: 500, data: error };
    }
  };

  //Login
  static login = async (
    email: string,
    password: string
  ): Promise<IApiResponse> => {
    try {
      const user = await Users.scope("withPassword").findOne({
        where: { email: email },
      });
      if (user) {
        const isMatch = await bcrypt.compare(
          password,
          user.dataValues.password
        );
        if (isMatch) {
          const userWithoutPassword: Partial<IUser> = { ...user.dataValues };
          delete userWithoutPassword["password"];
          const accessToken = this.createJwtToken(userWithoutPassword);
          return {
            message: "Login successfuly",
            status: 200,
            data: { user: userWithoutPassword, authToken: accessToken },
          };
        } else {
          return { message: "Invalid credentials", status: 401, data: null };
        }
      } else {
        return { message: "Invalid credentials", status: 401, data: null };
      }
    } catch (error) {
      return { message: "Error logging in", status: 500, data: error };
    }
  };

  static createJwtToken = (user: Partial<IUser>) => {
    return jwt.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
  };
}
