import { Request, Response } from "express";
import { UserType, UserPartialType } from "../schemes/userScheme";
import UserModel from "../models/userModel";
import TeacherClassModel from "../models/teacherClassModel";
import { TeacherClassType } from "../schemes/teacherClassScheme";

export class TeacherClassController {
  teacherClassModel: any;
  constructor({ teacherClassModel }: { teacherClassModel: TeacherClassModel }) {
    this.teacherClassModel = teacherClassModel;
  }

  getAll = async (req: Request, res: Response) => {
    const teacherClasses = await this.teacherClassModel.getAll();
    return res.status(200).json({ data: teacherClasses });
  };

  getById = async (req: Request, res: Response) => {
    const { teacherId, scheduleClassId } = req.params;
    console.log('asd', teacherId, scheduleClassId)
    const teacherClasses = await this.teacherClassModel.getById(
      teacherId,
      scheduleClassId
    );
    if (teacherClasses.length > 0) {
      return res.status(200).json({ data: teacherClasses });
    } else {
      return res.status(200).json({ message: "Teacher classes not found" });
    }
  };

  createTeacherClass = async (req: Request, res: Response) => {
    const teacherClass: TeacherClassType = req.body;
    const response = await this.teacherClassModel.createTeacherClass(teacherClass);
    return res.status(200).json(response);
  };

  deleteTeacherClass = async (req: Request, res: Response) => {
    const { teacherId, scheduleClassId } = req.params;
    const isTeacherClassDeleted = await this.teacherClassModel.deleteUser(
      teacherId,
      scheduleClassId
    );
    if (isTeacherClassDeleted) {
      return res
        .status(200)
        .json({ message: "Teacher class deleted successfuly" });
    } else {
      return res.status(400).json({ message: "Teacher class  not found" });
    }
  };
}
