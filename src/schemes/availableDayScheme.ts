import { sequelize } from "../database/db.connection";
import { DataTypes, ModelDefined, Optional } from "sequelize";
import { ScheduleClasses } from "./scheduleClassScheme";

export interface IAvailableDay {
  id: number;
  name: string;
}

export type Weekday = {
  1: "monday";
  2: "tuesday";
};

export type AvailableDayType = IAvailableDay;

const atributes = {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  weekday: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 6,
    },
  },
  startHour: {
    type: DataTypes.TIME,
  },
  endHour: {
    type: DataTypes.TIME,
  },
};

export const AvailableDays: ModelDefined<IAvailableDay, AvailableDayType> =
  sequelize.define("availableDay", atributes, {
    freezeTableName: true,
  });

AvailableDays.hasMany(ScheduleClasses, {
  as: "scheduleClassAvailableDay",
  foreignKey: "availableDayId",
});
ScheduleClasses.belongsTo(AvailableDays);
