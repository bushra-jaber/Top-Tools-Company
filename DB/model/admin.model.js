import mongoose, { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        default: "Admin",
        enum: ["User", "Admin"],
      }
  },
  {
    timestamps: true,
  }
);

const adminModel = mongoose.models.Admin || model("Admin", adminSchema);
export default adminModel;