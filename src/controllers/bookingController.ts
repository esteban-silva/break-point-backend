import dayjs from "dayjs";
import IApiResponse from "../interfaces/IApiResponse";
import BookingModel from "../models/bookingModel";
import { BookingType } from "../schemes/bookingScheme";
import { Request, Response } from "express";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
export class BookingController {
  bookingModel: any;
  constructor({ bookingModel }: { bookingModel: BookingModel }) {
    this.bookingModel = bookingModel;
  }

  getAll = async (req: Request, res: Response) => {
    const response: IApiResponse = await this.bookingModel.getAll();
    return res.status(response.status).json(response);
  };

  updateStatus = async (req: Request, res: Response) => {
    const newStatus = req.body;
    const response: IApiResponse =
      await this.bookingModel.updateStatus(newStatus);
    return res.status(response.status).json(response);
  };

  createBooking = async (req: Request, res: Response) => {
    const booking: BookingType = req.body;
    const response: IApiResponse =
      await this.bookingModel.createBooking(booking);
    return res.status(response.status).json(response);
  };

  getAllbyUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const response: IApiResponse = await this.bookingModel.getAllbyUser(id);
    return res.status(response.status).json(response);
  };

  getAvailableBookingByDate = async (req: Request, res: Response) => {
    const date = req.params.date;
    const surface = req.params.surface;
    console.log("date y surface", date, surface);
    const response: IApiResponse =
      await this.bookingModel.getAvailableBookingByDate(date, surface);
    return res.status(response.status).json(response);
  };
}
