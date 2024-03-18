import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Post from "../models/postmodels.js";


export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const userwithoutpass = user.toJSON();
    res.status(StatusCodes.OK).json({user: userwithoutpass })
};
export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const posts = await Post.countDocuments();
    res.status(StatusCodes.OK).json({users, posts})
};
export const updateUser = async (req, res) => {
    const obj = {...req.body};
    delete obj.password;
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj)
    res.status(StatusCodes.OK).json({msg: "User updated"})
};
