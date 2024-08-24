import { sequelize } from "../database/db.connection";
import { DataTypes, ModelDefined, Optional } from "sequelize";
import { ScheduleClasses } from "./scheduleClassScheme";
import { Bookings } from "./bookingScheme";

enum CourtSurface {
  HARD = "hard",
  CLAY = "clay",
}

export interface ICourt {
  id: number;
  name: string;
  surface: CourtSurface;
}

export type CourtType = ICourt;

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
  surface: {
    type: DataTypes.ENUM(CourtSurface.CLAY, CourtSurface.HARD),
    allowNull: false,
  },
};

export const Courts: ModelDefined<ICourt, CourtType> = sequelize.define(
  "court",
  atributes,
  {
    freezeTableName: true,
  }
);

Courts.hasMany(ScheduleClasses, {
  as: "scheduleClassCourt",
  foreignKey: "courtId",
});
ScheduleClasses.belongsTo(Courts);

Courts.hasMany(Bookings, {
  as: "bookingCourt",
  foreignKey: "courtId",
});
Bookings.belongsTo(Courts);
