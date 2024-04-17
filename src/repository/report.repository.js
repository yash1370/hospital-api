import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { reportSchema } from "../schema/report.schema.js";

const reportModel = mongoose.model("report", reportSchema);

export default class ReportRepository {
  async getAllReport(status) {
    try {
      const report = await reportModel.find({ status: status });
      return report;
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with database", 500);
    }
  }
}
