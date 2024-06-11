import { Router } from "express";
import { AvailableDayController } from "../controllers/availableDayController";
import AvailableDayModel from "../models/availableDayModel";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";

export const createAvailableDayRouter = ({
  availableDayModel,
}: {
  availableDayModel: AvailableDayModel;
}) => {
  const availableDayRouter = Router();
  const availableDayController = new AvailableDayController({
    availableDayModel,
  });

  availableDayRouter.get(
    "/",
    authenticationMiddleware,
    availableDayController.getAll
  );
  availableDayRouter.get(
    "/:id",
    authenticationMiddleware,
    availableDayController.getById
  );
  availableDayRouter.post(
    "/",
    authenticationMiddleware,
    availableDayController.createAvailableDay
  );
  availableDayRouter.delete(
    "/:id",
    authenticationMiddleware,
    availableDayController.deleteAvailableDay
  );
  availableDayRouter.patch(
    "/:id",
    authenticationMiddleware,
    availableDayController.updateAvailableDay
  );

  return availableDayRouter;
};
