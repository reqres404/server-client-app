import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { CreateError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User has been created");
  } catch (err) {
    next(err);
  }
};
export const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(CreateError(404, "User not found!"));
    const isPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isPassword) return next(CreateError(404, "Incorrect Password!"));
    const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token",token,{
        httponly:true
    }).status(201).json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
