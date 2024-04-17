import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/Hospital";

export const connectUsingMongoose = () => {
  try {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Mongodb using mongoose is connected");
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};