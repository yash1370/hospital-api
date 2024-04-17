import express from "express";
import doctorRouter from "./src/routes/doctor.routes.js";
import { connectUsingMongoose } from "./src/config/mongooseConnection.js";
import patientRouter from "./src/routes/patient.routes.js";
import reportRouter from "./src/routes/report.routes.js";

const app = express();

app.use(express.json());
const port = 3500;

// Default request handler
app.get("/", (req, res) => {
  res.send("Welcome to Hospital APIs");
});

//  list of all apis routes

app.use("/api/doctors", doctorRouter);
app.use("/api/patients", patientRouter);
app.use("/api/reports", reportRouter);

//  Middleware to handle 404 requests.
app.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found. Please check our documentation for more information at localhost:3200/api-docs"
    );
});

//  Specify port.
app.listen(port, () => {
  console.log("Server is running at 3500");
  //   MongodbConnection();
    connectUsingMongoose();
});
