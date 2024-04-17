import PatientRepository from "../repository/patient.repository.js";
import PatientModel from "../models/patient.model.js";

export default class PatientController {
  constructor() {
    this.patientRepository = new PatientRepository();
  }

  async register(req, res, next) {
    const { name, number } = req.body;
    try {
      const patient = new PatientModel(name, number);
      const result = await this.patientRepository.register(patient);

      if (result) {
        // Doctor already exists
        return res.status(200).json({
          message: result.message,
          data: {
            patient: patient,
          },
        });
      }
      // Doctor registration successful
      res.status(201).json({
        message: result.message,
        data: {
          patient: patient, // Assuming registrationResult contains the newly registered doctor object
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async createReport(req, res) {
    try {
      const doctorId = req.doctorId;
      const patientId = req.body.patientId;
      const status = req.body.status;
      const error = await this.patientRepository.createReport(
        doctorId,
        patientId,
        status
      );
      if (error) {
        return res.status(400).send(error);
      } else {
        return res.status(201).json({
          message: "Report created successfully",
        });
      }
    } catch (err) {
      // next(err);
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async getReportById(req, res) {
    const createdByDoctor = req.doctorId;
    const patientId = req.body.patientId;
    const result = await this.patientRepository.getReportById(
      patientId,
      createdByDoctor
    );
    if (!result) {
      res.status(404).json({
        message: `No Reports with status ${patientId}`,
      });
    } else {
      return res.status(200).json({
        message: `List of Reports of Patient with id  ${patientId}`,
        reports: result,
      });
    }
    try {
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
}
