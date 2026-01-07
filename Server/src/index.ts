import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import UserRoute from "./Routes/user.route";
import OtpRoute from "./Routes/otp.route";

dotenv.config();
const app = express();

console.log("SMTP_HOST =", process.env.SMTP_HOST);
console.log("SMTP_USERNAME =", process.env.SMTP_USERNAME);

const PORT = process.env.PORT || 3000;

const mongoUrl = process?.env?.MONGO_KEY;
if (!mongoUrl) {
  throw new Error("MONGO_URL environment variable is not defined");
}

// connect to mongoose
mongoose.connect(mongoUrl);
mongoose.connection.on("connected", () => {
  console.log("mongoDB connection established");
});
mongoose.connection.on("error", () => {
  console.log("connection error");
});

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome hello worldss");
});

// endpoints
app.use("/user", UserRoute);
app.use("/otp", OtpRoute);

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});

export default app;
