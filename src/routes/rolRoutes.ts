import { Router } from "express";
import { RolController } from "../controllers/rolController";
import RolModel from "../models/rolModel";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";

export const createRolRouter = ({ rolModel }: { rolModel: RolModel }) => {
  const rolRouter = Router();
  const rolController = new RolController({ rolModel });

  rolRouter.get("/", rolController.getAll);
  rolRouter.get("/:id", authenticationMiddleware, rolController.getById);
  rolRouter.post("/", rolController.createRol);
  rolRouter.delete("/:id", authenticationMiddleware, rolController.deleteRol);
  rolRouter.patch("/:id", authenticationMiddleware, rolController.updateRol);

  return rolRouter;
};
