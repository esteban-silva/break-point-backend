import dayjs from "dayjs";
import { sequelize } from "../database/db.connection";
import { DataTypes, ModelDefined, Optional } from "sequelize";

export enum BookingStatus {
  PENDING = "pending",
  APROVED = "approved",
  CANCELED = "cancelled",
}

export interface IBooking {
  id: number;
  date: Date;
  status: BookingStatus;
  courtId: number;
  userId: number;
}

export type BookingType = Optional<IBooking, "id">;
const atributes = {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      BookingStatus.PENDING,
      BookingStatus.APROVED,
      BookingStatus.CANCELED
    ),
    allowNull: false,
  },
};

export const Bookings: ModelDefined<IBooking, BookingType> = sequelize.define(
  "booking",
  atributes,
  {
    freezeTableName: true,
    getterMethods: {
      modifiedStartHourTime() {
        // console.log(`\x1b[44m \x1b[37m ${this.getDataValue("date").toLocaleTimeString()} \x1b[0m`);
        // dayjs( this.getDataValue("date")).format('DD/MM/YYYY')
      },
    },
  }
);
