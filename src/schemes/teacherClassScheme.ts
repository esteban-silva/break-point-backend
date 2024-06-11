import { sequelize } from "../database/db.connection";
import { DataTypes, ModelDefined, Optional } from "sequelize";
import { Users } from "./userScheme";
import { ScheduleClasses } from "./scheduleClassScheme";

export interface ITeacherClass {
  teacherId: number;
  scheduleClassId: number;
}

export type TeacherClassType = ITeacherClass;

const atributes = {
  // Model attributes are defined here
};

export const TeacherClasses = sequelize.define("teacherClasses", atributes, {
  freezeTableName: true,
});

ScheduleClasses.belongsToMany(Users, {
  through: TeacherClasses,
  foreignKey: "scheduleClassId",
});
Users.belongsToMany(ScheduleClasses, {
  through: TeacherClasses,
  foreignKey: "teacherId",
});

TeacherClasses.belongsTo(Users, { foreignKey: "teacherId" });
TeacherClasses.belongsTo(ScheduleClasses, { foreignKey: "scheduleClassId" });
