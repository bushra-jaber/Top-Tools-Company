import adminModel from "../../../DB/model/admin.model.js";
import { AppError } from "../../utls/AppError.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const createAdmin=async(req,res)=>{
    const { userName, email, password } = req.body;

const user = await adminModel.findOne({ email });
if (user) {
  return next(new AppError("email already exists", 409));
}
const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
const token = jwt.sign({ email }, process.env.CONFIRMEMAILSECRET);
const createAdmin = await adminModel.create({ userName, email, password: hashedPassword});
if (!createAdmin) {
  return next(new AppError(`error while creat user`, 400));

}
return res.status(201).json({ message: "success", user: createAdmin });
}
export const deleteAdmin=async(req,res)=>{
    const admin = await adminModel.findByIdAndDelete(req.params.id);
        if (!admin) {
            return next(new AppError("admin not found", 404));
}
return res.status(201).json({ message: "success"});
}
