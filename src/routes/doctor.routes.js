// 1. Import express.
import express from "express";
// import UserController from "./user.controller.js";
import DoctorController from "../controller/doctor.controller.js";

// 2. Initialize Express router.
const doctorRouter = express.Router();
const doctorController = new DoctorController();

// All the paths to the controller methods.

doctorRouter.post("/register", (req, res, next) => {
    doctorController.register(req, res, next);
});
doctorRouter.post("/login", (req, res) => {
    doctorController.login(req, res);
});

export default doctorRouter;
