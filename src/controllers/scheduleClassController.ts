import { Request, Response } from "express";
import { ScheduleClassType } from "../schemes/scheduleClassScheme";
import ScheduleClassModel from "../models/scheduleClassModel";

export class ScheduleClassController {
  scheduleClassModel: any;
  constructor({
    scheduleClassModel,
  }: {
    scheduleClassModel: ScheduleClassModel;
  }) {
    this.scheduleClassModel = scheduleClassModel;
  }

  getAll = async (req: Request, res: Response) => {
    const users = await this.scheduleClassModel.getAll();
    return res.status(200).json({ data: users });
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.scheduleClassModel.getById(id);
    if (user) {
      return res.status(200).json({ data: user });
    } else {
      return res.status(200).json({ message: "ScheduleClass not found" });
    }
  };

  createScheduleClass = async (req: Request, res: Response) => {
    const scheduleClass: ScheduleClassType = req.body;
    const newScheduleClass =
      await this.scheduleClassModel.createScheduleClass(scheduleClass);
    return res.status(200).json({
      data: newScheduleClass,
      message: "ScheduleClass created successfuly",
    });
  };

  deleteScheduleClass = async (req: Request, res: Response) => {
    const { id } = req.params;
    const isScheduleClassDeleted =
      await this.scheduleClassModel.deleteScheduleClass(id);
    if (isScheduleClassDeleted) {
      return res
        .status(200)
        .json({ message: "ScheduleClass deleted successfuly" });
    } else {
      return res.status(400).json({ message: "ScheduleClass not found" });
    }
  };

  updateScheduleClass = async (req: Request, res: Response) => {
    const { id } = req.params;
    const scheduleClassToUpdate: ScheduleClassType = req.body;
    if (Object.keys(scheduleClassToUpdate).length > 0) {
      const updatedUser = await this.scheduleClassModel.updateScheduleClass(
        id,
        scheduleClassToUpdate
      );
      if (updatedUser) {
        return res
          .status(200)
          .json({ message: "ScheduleClass updated successfuly" });
      } else {
        return res.status(400).json({ message: "ScheduleClass not found" });
      }
    } else {
      return res.status(400).json({
        message: "Must provide the ScheduleClass information to change",
      });
    }
  };
}
