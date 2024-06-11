import { Request, Response } from "express";
import courtModel from "../models/courtModel";
import { CourtType } from "../schemes/courtScheme";

export class CourtController {
  courtModel: any;
  constructor({ courtModel }: { courtModel: courtModel }) {
    this.courtModel = courtModel;
  }

  getAll = async (req: Request, res: Response) => {
    const courts = await this.courtModel.getAll();
    return res.status(200).json({ data: courts });
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const court = await this.courtModel.getById(id);
    if (court) {
      return res.status(200).json({ data: court });
    } else {
      return res.status(200).json({ message: "court not found" });
    }
  };

  createCourt = async (req: Request, res: Response) => {
    const court: CourtType = req.body;
    const newCourt: CourtType = await this.courtModel.createCourt(court);
    return res
      .status(200)
      .json({ data: newCourt, message: "court created successfuly" });
  };

  deleteCourt = async (req: Request, res: Response) => {
    const { id } = req.params;
    const isCourtDeleted = await this.courtModel.deleteCourt(id);
    if (isCourtDeleted) {
      return res.status(200).json({ message: "court deleted successfuly" });
    } else {
      return res.status(400).json({ message: "court not found" });
    }
  };

  updateCourt = async (req: Request, res: Response) => {
    const { id } = req.params;
    const courtToUpdate: CourtType = req.body;
    if (Object.keys(courtToUpdate).length > 0) {
      const updatedCourt = await this.courtModel.updateCourt(id, courtToUpdate);
      if (updatedCourt) {
        return res.status(200).json({ message: "court updated successfuly" });
      } else {
        return res.status(400).json({ message: "court not found" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Must provide the court information to change" });
    }
  };
}
