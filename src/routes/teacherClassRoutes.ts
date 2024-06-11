import { Router } from "express";
import { UserController } from "../controllers/userController";
import UserModel from "../models/userModel";
import TeacherClassModel from "../models/teacherClassModel";
import { TeacherClassController } from "../controllers/teacherClassController";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";

export const createTeacherClassRoutes = ({
  teacherClassModel,
}: {
  teacherClassModel: TeacherClassModel;
}) => {
  const teacherClassRouter = Router();
  const teacherClassController = new TeacherClassController({
    teacherClassModel,
  });

  teacherClassRouter.get(
    "/",
    authenticationMiddleware,
    teacherClassController.getAll
  );
  teacherClassRouter.get(
    "/:teacherId&:scheduleClassId",
    teacherClassController.getById
  );
  teacherClassRouter.post(
    "/",
    authenticationMiddleware,
    teacherClassController.createTeacherClass
  );
  teacherClassRouter.delete(
    "/:id",
    authenticationMiddleware,
    teacherClassController.deleteTeacherClass
  );

  return teacherClassRouter;
};
