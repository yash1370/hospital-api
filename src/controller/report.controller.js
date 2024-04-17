import ReportRepository from "../repository/report.repository.js";

export default class ReportController {
  constructor() {
    this.reportRepository = new ReportRepository();
  }

  async getReports(req, res) {
    const status = req.params.status;
    const result = await this.reportRepository.getAllReport(status);
    if (!result) {
      res.status(404).json({
        message: `No Reports with status ${status}`,
      });
    } else {
      return res.status(200).json({
        message: `List of Reports with status ${status}`,
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
