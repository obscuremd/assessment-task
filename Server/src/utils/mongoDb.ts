import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_KEY as string;

export const connectMongoDb = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};
