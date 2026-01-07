import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "../Model/User.Model";
import { sendMail } from "../utils/mailService";
import { Otp } from "../Model/Otp.Model";

const router = Router();

router.post("/auth", async (req: Request, res: Response) => {
  try {
    let { purpose, email, password } = req.body;

    if (!email || !purpose) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    email = email.toLowerCase(); // convert email to lowercase

    const user = await User.findOne({ email });

    // -------- LOGIN --------
    if (purpose === "login") {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (!password) {
        res.status(400).json({ message: "Password required" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid password" });
        return;
      }
    }

    // -------- REGISTER --------
    if (purpose === "register" && user) {
      res.status(409).json({ message: "User already exists, please login" });
      return;
    }

    // Generate OTP
    const code = Math.floor(100000 + Math.random() * 900000);
    const subject =
      purpose === "login" ? "Your Login Code" : "Your Registration Code";

    await sendMail(
      email,
      subject,
      `Your OTP is <b>${code}</b>. It will expire in 5 minutes.`
    );

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      code,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
