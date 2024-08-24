import { sequelize } from "../database/db.connection";
import { DataTypes, ModelDefined, Optional } from "sequelize";
import { Users } from "./userScheme";
import { Courts } from "./courtScheme";

export interface IScheduleClass {
  id: number;
  maxCapacity: number;
  level: ClassLevel;
  dayOfWeek: number;
  duration: number;
  startHour: string;
  courtId: number;
  userId: number;
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
  level: {
    type: DataTypes.ENUM(
      ClassLevel.beginner,
      ClassLevel.intermediate,
      ClassLevel.advanced
    ),
    allowNull: false,
  },
  dayOfWeek: {
    type: DataTypes.INTEGER,
    max: 6,
    min: 0,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startHour: {
    type: DataTypes.TIME,
    allowNull: false,
    timezone: false,
    formatDataType: "time",
  },
};

export const ScheduleClasses: ModelDefined<IScheduleClass, ScheduleClassType> =
  sequelize.define("scheduleClass", atributes, {
    freezeTableName: true,

    getterMethods: {
      modifiedStartHourTime() {
        console.log(
          "valor de startHour ahora: ",
          this.getDataValue("startHour").split(" ")[0]
        );
        return this.getDataValue("startHour").split(" ")[0];
      },
    },
  });

ScheduleClasses.hasMany(Users, {
  as: "usersScheduleClass",
  foreignKey: "scheduleClassId",
});
Users.belongsTo(ScheduleClasses);
