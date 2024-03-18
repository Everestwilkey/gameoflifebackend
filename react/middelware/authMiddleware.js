import { set } from "mongoose";
import { unauthenticatedError } from "../Errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  console.log(req.headers);
  const token  = req.headers.token;

  console.log(token)
  if (!token) throw new unauthenticatedError('authentication invalid');

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new unauthenticatedError ('authentication invalid');
  }
};