import DoctorModel from "../models/doctor.model.js";
import jwt from "jsonwebtoken";
import DoctorRepository from "../repository/doctor.repository.js";

export default class DoctorController {
  constructor() {
    this.doctorRepository = new DoctorRepository();
  }

  async register(req, res, next) {
    const { name, username, password } = req.body;
    try {
      const doctor = new DoctorModel(name, username, password);
      const result = await this.doctorRepository.register(doctor);

      if (result) {
        // Doctor already exists
        return res.status(200).json({
          message: result.message,
          data: {
            doctor: doctor,
          },
        });
      }
      // Doctor registration successful
      res.status(201).json({
        message: result.message,
        data: {
          doctor: doctor, // Assuming registrationResult contains the newly registered doctor object
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res) {
    try {
      // find doctor by username
      const doctor = await this.doctorRepository.login(req.body.username);

      if (!doctor) {
        return res.status(400).json({
          message: "Invalid UserName or Password",
        });
      } else {
        // 1. create a token
        const token = jwt.sign(doctor.toJSON(), "ejhefghdegvh", {
          expiresIn: "1h",
        });
        // 2. send the token
        return res.status(200).json({
          message:
            "Sign in successful. Here is your token, please keep it safe",
          token: token,
        });
      }
    } catch (err) {
      // next(err);
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
}
