import { Courts, CourtType } from "../schemes/courtScheme";

export default class CourtModel {
  static getById = async (id: number) => {
    const court = await Courts.findByPk(id);
    return court?.dataValues;
  };

  static getAll = async () => {
    const allCourts = await Courts.findAll();
    return allCourts;
  };

  static createCourt = async (court: CourtType) => {
    const newCourt = await Courts.create(court);
    return newCourt.dataValues;
  };

  static deleteCourt = async (id: number) => {
    const court = await Courts.findByPk(id);
    if (court) {
      court.destroy();
      court.save();
      return true;
    } else {
      return false;
    }
  };

  static updateCourt = async (id: number, courtToUpdate: CourtType) => {
    const court = await Courts.findByPk(id);
    if (court) {
      court.update(courtToUpdate);
      court.save();
      return true;
    } else {
      return false;
    }
  };
}
