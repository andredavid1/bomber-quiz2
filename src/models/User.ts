import mongoose, { model, models, now } from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rg: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    level: { type: String, default: "consumer" },
    registered: { type: Boolean, default: false },
    expiresRegister: { type: Date },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;