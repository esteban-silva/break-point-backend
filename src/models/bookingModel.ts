import { DataTypes, Op } from "sequelize";
import IApiResponse from "../interfaces/IApiResponse";
import { Bookings, BookingStatus, BookingType } from "../schemes/bookingScheme";
import { Courts, ICourt } from "../schemes/courtScheme";
import { Users } from "../schemes/userScheme";
import { ScheduleClasses } from "../schemes/scheduleClassScheme";
import _ from "lodash";
import sequelize from "sequelize";
import dayjs from "dayjs";

export default class BookingModel {
  // ---------------- Utils functions private --------------------------------------------
  // private static getRecomendedBookingCourts = async (
  //   date: Date
  // ): Promise<ICourt[] | undefined> => {
  //   try {
  //     const fromDate = date;
  //     const toDate = date;
  //     fromDate.setHours(date.getHours() - 5, 0, 0, 0);
  //     toDate.setHours(date.getHours() + 5, 0, 0, 0);

  //     const allCourts = await Courts.findAll({});

  //     const courtClassesOnDate = await ScheduleClasses.findAll({
  //       attributes: ["courtId", "startHour"],
  //       where: {
  //         [Op.and]: {
  //           dayOfWeek: date.getDay(),
  //           startHour: {
  //             [Op.between]: [
  //               `${fromDate.getUTCHours()}:00`,
  //               `${toDate.getUTCHours()}:00`,
  //             ],
  //           },
  //         },
  //       },
  //     });

  //     const courtBookingsOnDate = await Bookings.findAll({
  //       attributes: ["courtId", "date"],
  //       where: {
  //         date: {
  //           [Op.between]: [fromDate, toDate],
  //         },
  //       },
  //     });

  //     return allCourts.filter((court) => {
  //       return !courtBookingsOnDate.some((boooking) => {
  //         return (
  //           boooking.dataValues.courtId === court.dataValues.id &&
  //           boooking.dataValues.date === date
  //         );
  //       });
  //     });
  //   } catch (error) {
  //     return undefined;
  //   }
  // };

  private static availableBookingsCourtsByDate = async (
    date: string,
    surface: string
  ): Promise<ICourt[] | undefined> => {
    const dayjsDate = dayjs(date);

    try {
      const where = surface !== "any" ? { surface: surface } : {};

      const allCourts = await Courts.findAll({
        where: where,
      });

      const courtClassesOnDate = await ScheduleClasses.findAll({
        attributes: ["courtId"],
        where: {
          [Op.and]: {
            [Op.and]: {
              dayOfWeek: dayjsDate.day(),
              startHour: `${dayjsDate.get("hour")}:00`,
            },
          },
        },
      });

      const courtBookingsOnDate = await Bookings.findAll({
        attributes: ["courtId"],
        where: {
          [Op.and]: {
            date: date,
          },
        },
      });

      const availableCourts = [...courtBookingsOnDate, ...courtClassesOnDate];

      return allCourts.filter((court) => {
        return !availableCourts.some((availableCourt) => {
          return availableCourt.dataValues.courtId === court.dataValues.id;
        });
      }) as unknown as ICourt[];
    } catch (error) {
      console.log("catch error availableBookingsCourtsByDate", error);
      return undefined;
    }
  };

  // ------------------------------------------------------------------------------------

  static getAll = async (): Promise<IApiResponse> => {
    try {
      const allBookings = await Bookings.findAll({
        include: [{ model: Courts }],
      });
      return {
        data: allBookings,
        message: "All bookings retrieved successfully",
        status: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: "Error retrieving all bookings",
        status: 500,
      };
    }
  };

  static createBooking = async (
    booking: BookingType
  ): Promise<IApiResponse> => {
    const date = dayjs(booking.date);
    try {
      const court = await Courts.findByPk(booking.courtId);
      if (!court)
        return {
          data: null,
          status: 400,
          message: "Court not found",
        };
      const user = await Users.findByPk(booking.userId);
      if (!user) {
        return {
          data: null,
          status: 400,
          message: "User not found",
        };
      }

      const existingBooking = await Bookings.findOne({
        where: {
          [Op.and]: [{ courtId: booking.courtId }, { date: booking.date }],
        },
      });
      if (existingBooking) {
        return {
          data: null,
          status: 400,
          message: `Booking already exists on court: ${booking.courtId} on date: ${booking.date}`,
        };
      }

      const existingClass = await ScheduleClasses.findOne({
        where: {
          [Op.and]: [
            { courtId: booking.courtId },
            { dayOfWeek: date.day() },
            { startHour: `${date.get("hour")}:00` },
          ],
        },
      });
      if (existingClass) {
        return {
          data: null,
          status: 400,
          message: `There is a class on court: ${booking.courtId} on date: ${booking.date}`,
        };
      }

      const newBooking = await Bookings.create(booking);
      return {
        data: newBooking.dataValues,
        status: 200,
        message: "Booking created",
      };
    } catch (error) {
      return {
        data: error,
        message: "Error creating booking",
        status: 500,
      };
    }
  };

  static updateStatus = async (
    newStatus: BookingStatus,
    id: number
  ): Promise<IApiResponse> => {
    const booking = await Bookings.findByPk(id);
    if (booking) {
      booking.update({ status: newStatus });
      booking.save();
      return {
        data: booking.dataValues,
        status: 200,
        message: "Booking status updated",
      };
    } else {
      return {
        data: null,
        status: 400,
        message: "Booking not found",
      };
    }
  };

  static getAllbyUser = async (id: number): Promise<IApiResponse> => {
    try {
      const allBookings = await Bookings.findAll({
        include: [{ model: Courts }],
        where: { userId: id },
      });
      if (!allBookings) {
        return {
          data: null,
          status: 400,
          message: "Bookings not found",
        };
      }
      return {
        data: allBookings,
        message: "All bookings retrieved successfully",
        status: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: "Error retrieving all bookings",
        status: 500,
      };
    }
  };

  static getAvailableBookingByDate = async (
    date: string,
    surface: string
  ): Promise<IApiResponse> => {
    try {
      const availableCourts = await this.availableBookingsCourtsByDate(
        date,
        surface
      );
      // TODO: Recomendaciones si no hay disponibles +- 5 horas
      // if (availableCourts?.length === 0) {
      //   return {
      //     data: {
      //       courts: recomendationCourts(date),
      //       courtsForDate: false,
      //     },
      //     status: 400,
      //     message: "No available courts found for date specified",
      //   };
      // } else {
      return {
        data: availableCourts,
        status: 200,
        message: "Available courts retrieved successfully",
      };
    } catch (error) {
      return {
        data: error,
        message: "Error retrieving all bookings",
        status: 500,
      };
    }
  };
}
