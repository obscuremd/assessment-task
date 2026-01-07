import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  d_o_b: { type: Number, required: true },
  gender: { type: String, required: true },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
