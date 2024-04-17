import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { patientSchema } from "../schema/patient.schema.js";
import { reportSchema } from "../schema/report.schema.js";
import { doctorSchema } from "../schema/doctor.schema.js";

// create model from schema

const patientModel = mongoose.model("patient", patientSchema);
const reportModel = mongoose.model("report", reportSchema);
const doctorModel = mongoose.model("doctor", doctorSchema);

export default class PatientRepository {
  async register(patient) {
    try {
      // Check if doctor already exists
      const existingPatient = await patientModel.findOne({
        number: patient.number,
      });

      if (existingPatient) {
        return {
          message: "Patient Already Exists",
        };
      } else {
        const newPatient = new patientModel(patient);
        await newPatient.save();
        return {
          message: "Patient is created successfully",
          newPatient,
        };
      }
    } catch (err) {
      console.error(err);
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        throw new Error("Something went wrong with the database", 500); // Internal Server Error
      }
    }
  }

  async createReport(doctorId, patientId, status) {
    try {
      const findPatient = await patientModel.findById(patientId);
      if (!findPatient) {
        return res.status(400).json({
          message: "Patient Does not exist",
        });
      }
      const report = await reportModel({
        createdByDoctor: new ObjectId(doctorId),
        patient: new ObjectId(patientId),
        status: status,
        date: new Date(),
      });
      report.save();
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with database", 500);
    }
  }

  async getReportById(patientId) {
    try {
      const patientReport = await reportModel
        .find({
          patient: new ObjectId(patientId),
        })
        .sort({ date: 1 });

      const reportsWithDoctorName = await Promise.all(
        patientReport.map(async (report) => {
          const doctor = await doctorModel.findById(report.createdByDoctor);
          const formattedDate = new Date(report.date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          return {
            createdByDoctor: doctor.name,
            status: report.status,
            date: formattedDate,
          };
        })
      );

      return reportsWithDoctorName;
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with the database", 500);
    }
  }
}
