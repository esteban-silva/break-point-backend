import { Router } from "express";
import ScheduleClassModel from "../models/scheduleClassModel";
import { ScheduleClassController } from "../controllers/scheduleClassController";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";

export const createScheduleClassRouter = ({
  scheduleClassModel,
}: {
  scheduleClassModel: ScheduleClassModel;
}) => {
  const scheduleClassRouter = Router();
  const scheduleClassController = new ScheduleClassController({
    scheduleClassModel,
  });

  scheduleClassRouter.get(
    "/",
    authenticationMiddleware,
    scheduleClassController.getAll
  );
  scheduleClassRouter.get(
    "/:id",
    authenticationMiddleware,
    scheduleClassController.getById
  );
  scheduleClassRouter.post(
    "/",
    authenticationMiddleware,
    scheduleClassController.createScheduleClass
  );
  scheduleClassRouter.delete(
    "/:id",
    scheduleClassController.deleteScheduleClass
  );
  scheduleClassRouter.patch(
    "/:id",
    scheduleClassController.updateScheduleClass
  );

  return scheduleClassRouter;
};
