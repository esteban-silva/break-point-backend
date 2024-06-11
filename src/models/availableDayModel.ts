import {
  AvailableDays,
  AvailableDayType,
} from "../schemes/availableDayScheme";

export default class AvailableDayModel {
  static getById = async (id: number) => {
    const availableDay = await AvailableDays.findByPk(id);
    return availableDay?.dataValues;
  };

  static getAll = async () => {
    const allAvailableDays = await AvailableDays.findAll();
    return allAvailableDays;
  };

  static createAvailableDay = async (availableDay: AvailableDayType) => {
    const newAvailableDay = await AvailableDays.create(availableDay);
    return newAvailableDay.dataValues;
  };

  static deleteAvailableDay = async (id: number) => {
    const availableDay = await AvailableDays.findByPk(id);
    if (availableDay) {
      availableDay.destroy();
      availableDay.save();
      return true;
    } else {
      return false;
    }
  };

  static updateAvailableDay = async (
    id: number,
    availableDayToUpdate: AvailableDayType
  ) => {
    const availableDay = await AvailableDays.findByPk(id);
    if (availableDay) {
      availableDay.update(availableDayToUpdate);
      availableDay.save();
      return true;
    } else {
      return false;
    }
  };
}
