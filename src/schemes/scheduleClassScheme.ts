import { sequelize } from "../database/db.connection";
import { DataTypes, ModelDefined, Optional } from "sequelize";
import { Users } from "./userScheme";
import { Courts } from "./courtScheme";
import { AvailableDays } from "./availableDayScheme";

export interface IScheduleClass {
  id: number;
  maxCapacity: number;
  classLavel: string;
  courtId: number;
  availableDayId: number;
}

export enum ClassLevel {
  beginner = "beginner",
  intermediate = "intermediate",
  advanced = "advanced",
}

export type ScheduleClassType = IScheduleClass;

const atributes = {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  maxCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  classLevel: {
    type: DataTypes.ENUM(
      ClassLevel.beginner,
      ClassLevel.intermediate,
      ClassLevel.advanced
    ),
    allowNull: false,
  },
};

export const ScheduleClasses: ModelDefined<IScheduleClass, ScheduleClassType> =
  sequelize.define("scheduleClass", atributes, {
    freezeTableName: true,
  });

ScheduleClasses.hasMany(Users, {
  as: "usersScheduleClass",
  foreignKey: "scheduleClassId",
});
Users.belongsTo(ScheduleClasses);
