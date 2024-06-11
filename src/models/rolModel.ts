import { Roles, RolType } from "../schemes/rolScheme";

export default class RolModel {
  static getById = async (id: number) => {
    const rol = await Roles.findByPk(id);
    return rol?.dataValues;
  };

  static getAll = async () => {
    const allRols = await Roles.findAll({ include: "userRol" });
    return allRols;
  };

  static createRol = async (rol: RolType) => {
    const newRol = await Roles.create(rol);
    return newRol.dataValues;
  };

  static deleteRol = async (id: number) => {
    const rol = await Roles.findByPk(id);
    if (rol) {
      rol.destroy();
      rol.save();
      return true;
    } else {
      return false;
    }
  };

  static updateRol = async (id: number, rolToUpdate: RolType) => {
    const rol = await Roles.findByPk(id);
    if (rol) {
      rol.update(rolToUpdate);
      rol.save();
      return true;
    } else {
      return false;
    }
  };
}
