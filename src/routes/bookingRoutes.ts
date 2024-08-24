import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";
import BookingModel from "../models/bookingModel";
import { BookingController } from "../controllers/bookingController";

export const createBookingRouter = ({
  bookingModel,
}: {
  bookingModel: BookingModel;
}) => {
  const bookingRouter = Router();
  const bookingController = new BookingController({ bookingModel });

  bookingRouter.get("/", authenticationMiddleware, bookingController.getAll);

  bookingRouter.patch(
    "/",
    authenticationMiddleware,
    bookingController.updateStatus
  );

  bookingRouter.post(
    "/",
    authenticationMiddleware,
    bookingController.createBooking
  );

  bookingRouter.get(
    "/get-available-booking-by-date/:date/:surface",
    authenticationMiddleware,
    bookingController.getAvailableBookingByDate
  );

  bookingRouter.get(
    "/:id",
    authenticationMiddleware,
    bookingController.getAllbyUser
  );

  return bookingRouter;
};
