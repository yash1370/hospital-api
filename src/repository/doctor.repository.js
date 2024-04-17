import mongoose from "mongoose";
import { doctorSchema } from "../schema/doctor.schema.js";
// import { DoctorModel } from "../models/doctor.model.js";

// create model from schema

const doctorModel = mongoose.model("doctor", doctorSchema);

export default class DoctorRepository {
  async register(doctor) {
    try {
      // Check if doctor already exists
      const existingDoctor = await doctorModel.findOne({
        username: doctor.username,
      });

      if (existingDoctor) {
        return {
          message: "Doctor Already Exists",
        };
      } else {
        const newDoctor = new doctorModel(doctor);
        await newDoctor.save();
        return {
          message: "Doctor is created successfully",
          newDoctor,
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

  async login(username) {
    try {
      return await doctorModel.findOne({ username });
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with database", 500);
    }
  }
}
