
import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashedPassword } from "../utils/passwordUtils.js";
import { UnauthorizedError, unauthenticatedError } from "../Errors/customErrors.js";
import { comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const isFirstAccount = await User.countDocuments() === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const HashedPassword = await hashedPassword(req.body.password);
  req.body.password = HashedPassword;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({msg: "User created"});
};
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(req.body.password, req.body.email);
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new unauthenticatedError('invalid credentials');

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;
  console.log('Setting cookie:', token);
  res.cookie( token, {
    httpOnly: false,
    expires: new Date(Date.now() + oneDay),
    secure: false,
    maxAge: oneDay,
  });

  res.set({'token': token})
  res.status(StatusCodes.OK).json({ msg: 'user logged in' });
};

export const logout = async (req, res) => {
  res.cookie('token', 'loggedout',{
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({msg: "user logged out"});
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};