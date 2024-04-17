// 1. Import express.
import express from "express";
import PatientController from "../controller/patient.controller.js";
import jwtAuth from "../config/jwt.middleware.js";

// 2. Initialize Express router.
const patientRouter = express.Router();
const patientController = new PatientController();

// All the paths to the controller methods.

patientRouter.post("/register", jwtAuth, (req, res, next) => {
  patientController.register(req, res, next);
});

patientRouter.post("/create-report", jwtAuth, (req, res, next) => {
  patientController.createReport(req, res, next);
});

patientRouter.get("/all-reports", jwtAuth, (req, res, next) => {
  patientController.getReportById(req, res, next);
});

export default patientRouter;
