import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema(
  {
    code: { type: Number, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export const Otp = mongoose.models.Otp || mongoose.model('Otp', OtpSchema);
