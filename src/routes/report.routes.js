// 1. Import express.
import express from "express";
import jwtAuth from "../config/jwt.middleware.js";
import ReportController from "../controller/report.controller.js";

// 2. Initialize Express router.
const reportRouter = express.Router();
const reportController = new ReportController();

// All the paths to the controller methods.

reportRouter.get("/:status", jwtAuth, (req, res, next) => {
    reportController.getReports(req, res, next);
});


export default reportRouter;
