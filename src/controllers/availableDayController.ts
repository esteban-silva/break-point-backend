import { Request, Response } from "express";
import availableDayModel from "../models/availableDayModel";
import { AvailableDayType } from "../schemes/availableDayScheme";

export class AvailableDayController {
  availableDayModel: any;
  constructor({ availableDayModel }: { availableDayModel: availableDayModel }) {
    this.availableDayModel = availableDayModel;
  }

  getAll = async (req: Request, res: Response) => {
    const availableDays = await this.availableDayModel.getAll();
    return res.status(200).json({ data: availableDays });
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const availableDay = await this.availableDayModel.getById(id);
    if (availableDay) {
      return res.status(200).json({ data: availableDay });
    } else {
      return res.status(200).json({ message: "AvailableDay not found" });
    }
  };

  createAvailableDay = async (req: Request, res: Response) => {
    const availableDay: AvailableDayType = req.body;
    const newAvailableDay: AvailableDayType = await this.availableDayModel.createAvailableDay(availableDay);
    return res
      .status(200)
      .json({ data: newAvailableDay, message: "AvailableDay created successfuly" });
  };

  deleteAvailableDay = async (req: Request, res: Response) => {
    const { id } = req.params;
    const isAvailableDayDeleted = await this.availableDayModel.deleteAvailableDay(id);
    if (isAvailableDayDeleted) {
      return res.status(200).json({ message: "AvailableDay deleted successfuly" });
    } else {
      return res.status(400).json({ message: "AvailableDay not found" });
    }
  };

  updateAvailableDay = async (req: Request, res: Response) => {
    const { id } = req.params;
    const availableDayToUpdate: AvailableDayType = req.body;
    if (Object.keys(availableDayToUpdate).length > 0) {
      const updatedAvailableDay = await this.availableDayModel.updateAvailableDay(id, availableDayToUpdate);
      if (updatedAvailableDay) {
        return res.status(200).json({ message: "AvailableDay updated successfuly" });
      } else {
        return res.status(400).json({ message: "AvailableDay not found" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Must provide the AvailableDay information to change" });
    }
  };
}
