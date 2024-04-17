import mongoose from "mongoose";

export const reportSchema = new mongoose.Schema(
  {
    createdByDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    status: {
      type: String,
      require: true,
      enum: [
        "Negative",
        "Traveled-Quarantine",
        "Symptoms-Quarantine",
        "Positive",
      ],
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
