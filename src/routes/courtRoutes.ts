import { Router } from "express";
import { CourtController } from "../controllers/courtController";
import CourtModel from "../models/courtModel";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";

export const createCourtRouter = ({
  courtModel,
}: {
  courtModel: CourtModel;
}) => {
  const courtRouter = Router();
  const courtController = new CourtController({ courtModel });

  courtRouter.get("/", authenticationMiddleware, courtController.getAll);
  courtRouter.get("/:id", authenticationMiddleware, courtController.getById);
  courtRouter.post("/", authenticationMiddleware, courtController.createCourt);
  courtRouter.delete(
    "/:id",
    authenticationMiddleware,
    courtController.deleteCourt
  );
  courtRouter.patch(
    "/:id",
    authenticationMiddleware,
    courtController.updateCourt
  );

  return courtRouter;
};
