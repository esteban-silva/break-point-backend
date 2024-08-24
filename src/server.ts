import express from "express";
import cors from "cors";
import { createUserRouter } from "./routes/userRoutes";
import UserModel from "./models/userModel";
import { sequelize } from "./database/db.connection";
import dotenv from "dotenv";
import { createRolRouter } from "./routes/rolRoutes";
import RolModel from "./models/rolModel";
import CourtModel from "./models/courtModel";
import { createCourtRouter } from "./routes/courtRoutes";
import { createScheduleClassRouter } from "./routes/scheduleClassRoutes";
import ScheduleClassModel from "./models/scheduleClassModel";
import { createTeacherClassRoutes } from "./routes/teacherClassRoutes";
import TeacherClassModel from "./models/teacherClassModel";
import cookieParser from "cookie-parser";
import BookingModel from "./models/bookingModel";
import { createBookingRouter } from "./routes/bookingRoutes";

dotenv.config();
const app = express();
app.disabled("x-powered-by");
// Middleware used to have access to req.body as JSON
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/user", createUserRouter({ userModel: UserModel }));
app.use("/rol", createRolRouter({ rolModel: RolModel }));
app.use("/court", createCourtRouter({ courtModel: CourtModel }));

app.use(
  "/scheduleClass",
  createScheduleClassRouter({ scheduleClassModel: ScheduleClassModel })
);
app.use(
  "/teacherClass",
  createTeacherClassRoutes({ teacherClassModel: TeacherClassModel })
);

app.use("/booking", createBookingRouter({ bookingModel: BookingModel }));

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});

try {
  sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    // .then(() => sequelize.sync({ force: true }));
    .then(() => sequelize.sync());
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
