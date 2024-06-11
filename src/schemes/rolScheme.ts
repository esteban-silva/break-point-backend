import { sequelize } from "../database/db.connection";
import { DataTypes, ModelDefined, Optional } from "sequelize";
import { Users } from "./userScheme";

export interface IRol {
  id: number;
  name: string;
}

export type RolType = IRol;

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
};

export const Roles: ModelDefined<IRol, RolType> = sequelize.define(
  "rol",
  atributes,
  {
    freezeTableName: true,
  }
);

Roles.hasMany(Users, {
  as: "userRol",
  foreignKey: "rolId",
});
Users.belongsTo(Roles);
