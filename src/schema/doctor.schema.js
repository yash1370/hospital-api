import mongoose from "mongoose";

export const doctorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reports",
      },
    ],
  },
  {
    timestamps: true,
  }
);

