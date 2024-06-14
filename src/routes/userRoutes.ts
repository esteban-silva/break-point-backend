import { Router } from "express";
import { UserController } from "../controllers/userController";
import UserModel from "../models/userModel";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";

export const createUserRouter = ({ userModel }: { userModel: UserModel }) => {
  const userRouter = Router();
  const userController = new UserController({ userModel });

  userRouter.get("/", authenticationMiddleware, userController.getAll);
  userRouter.get("/:id", authenticationMiddleware, userController.getById);
  userRouter.delete(
    "/:id",
    authenticationMiddleware,
    userController.deleteUser
  );
  userRouter.patch("/:id", authenticationMiddleware, userController.updateUser);

  //Login
  userRouter.post("/signup", userController.createCommonUser);
  userRouter.post("/registerTeacher", userController.setUserTeacher);
  userRouter.post("/login", userController.login);
  // userRouter.post("/logout", userController.logout);

  return userRouter;
};
