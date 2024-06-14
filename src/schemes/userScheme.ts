import { sequelize } from "../database/db.connection";
import { DataTypes, ModelDefined, Optional } from "sequelize";
import { ScheduleClasses } from "./scheduleClassScheme";

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  ci: string;
  phone: string;
  rolId: number;
  isTeacher: boolean;
}

export type UserType = Optional<IUser, "phone" | "isTeacher" | "rolId" | "id">;

export type UserPartialType = Partial<IUser>;

const atributes = {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ci: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  isTeacher: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
};

export const Users: ModelDefined<IUser, UserType> = sequelize.define(
  "user",
  atributes,
  {
    freezeTableName: true,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ["password"] },
      },
    },
  }
);
