import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Otp } from "../Model/Otp.Model";
import { User } from "../Model/User.Model";

const router = Router();

router.post("/verify-otp", async (req: Request, res: Response) => {
  try {
    let { purpose, code, email, password, fullname, d_o_b, gender } = req.body;

    if (!email || !code || !purpose) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    email = email.toLowerCase(); // convert email to lowercase

    if (!["login", "register"].includes(purpose)) {
      res.status(400).json({ message: "Invalid purpose" });
      return;
    }

    const otp = await Otp.findOne({ email });

    // ---------- OTP VALIDATION ----------
    if (
      !otp ||
      String(otp.code) !== String(code) ||
      (otp.expiresAt && otp.expiresAt < new Date())
    ) {
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    await Otp.deleteMany({ email });

    // ---------- REGISTER ----------
    if (purpose === "register") {
      if (!password || !fullname) {
        res.status(400).json({ message: "Missing registration data" });
        return;
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).json({ message: "User already exists" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        email,
        fullname,
        d_o_b,
        gender,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "2d" }
      );

      res.status(201).json({
        message: "Registration successful",
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
          fullname: newUser.fullname,
        },
      });
      return;
    }

    // ---------- LOGIN ----------
    if (purpose === "login") {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "2d" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user._id, email: user.email, fullname: user.fullname },
      });
      return;
    }
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
