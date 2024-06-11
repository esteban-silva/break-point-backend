import { Roles } from "../schemes/rolScheme";
import { ScheduleClasses } from "../schemes/scheduleClassScheme";
import {
  TeacherClasses,
  TeacherClassType,
} from "../schemes/teacherClassScheme";
import { UserPartialType, Users, UserType } from "../schemes/userScheme";

export default class TeacherClassModel {
  static getById = async (teacherId: number, scheduleClassId: number) => {
    const teacherClasses = await TeacherClasses.findAll({
      where: {
        teacherId: teacherId,
        scheduleClassId: scheduleClassId,
      },
      include: [Users, ScheduleClasses],
    });
    return teacherClasses;
  };

  static getAll = async () => {
    const allTeachersClasses = await TeacherClasses.findAll();
    return allTeachersClasses;
  };

  static createTeacherClass = async (teacherClass: TeacherClassType) => {
    const validScheduleClass = await ScheduleClasses.findByPk(
      teacherClass.scheduleClassId
    );
    const validTeacher = await Users.findOne({
      where: {
        id: teacherClass.teacherId,
        isTeacher: true,
      },
    });
    console.log(validScheduleClass);
    if (validScheduleClass && validTeacher) {
      const newTeacherClass = await TeacherClasses.create({ ...teacherClass });
      return {
        message: "Teacher class created successfuly",
        data: newTeacherClass.dataValues,
      };
    } else {
      return { message: "Teacher or schedule class not found" };
    }
  };

  static deleteTeacherClass = async (
    teacherId: number,
    scheduleClassId: number
  ) => {
    const teacherClass = await TeacherClasses.findOne({
      where: {
        teacherId: teacherId,
        scheduleClassId: scheduleClassId,
      },
    });
    if (teacherClass) {
      teacherClass.destroy();
      teacherClass?.save();
      return true;
    } else {
      return false;
    }
  };
}
