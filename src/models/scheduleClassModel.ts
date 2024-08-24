import { Courts } from "../schemes/courtScheme";
import {
  ScheduleClasses,
  ScheduleClassType,
} from "../schemes/scheduleClassScheme";

export default class ScheduleClassModel {
  static getById = async (id: number) => {
    const scheduleClass = await ScheduleClasses.findByPk(id);
    return scheduleClass?.dataValues;
  };

  static getAll = async () => {
    const allScheduleClassses = await ScheduleClasses.findAll({
      include: [
        {
          model: Courts,
          required: true,
          attributes: ["id", "name"],
        },
      ],
    });
    return allScheduleClassses;
  };

  static createScheduleClass = async (scheduleClass: ScheduleClassType) => {
    const newScheduleClass = {...scheduleClass, startHour: (scheduleClass.startHour)}

    return (await ScheduleClasses.create(scheduleClass)).dataValues;
  };

  static deleteScheduleClass = async (id: number) => {
    const scheduleClass = await ScheduleClasses.findByPk(id);
    if (scheduleClass) {
      scheduleClass.destroy();
      scheduleClass.save();
      return true;
    } else {
      return false;
    }
  };

  static updateScheduleClass = async (
    id: number,
    scheduleClassToUpdate: ScheduleClassType
  ) => {
    const scheduleClass = await ScheduleClasses.findByPk(id);
    if (scheduleClass) {
      scheduleClass.update(scheduleClassToUpdate);
      scheduleClass.save();
      return true;
    } else {
      return false;
    }
  };
}
