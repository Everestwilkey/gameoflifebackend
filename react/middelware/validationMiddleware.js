import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../Errors/customErrors.js";
import { Item_Types } from "../utils/constants.js";
import mongoose from "mongoose";
import Post from "../models/postmodels.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("No post")) {
          throw new NotFoundError(errorMessages);
        }
        if(errorMessages[0].startsWith("You are not authorized")){
          throw new UnauthorizedError("You are not authorized to perform this action");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validatePost = withValidationErrors([
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("item").isIn(Object.values(Item_Types)).withMessage("Invalid Item Type"),
]);

export const validatePostId = withValidationErrors([
  param("id").custom(async (value, {req}) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("Invalid Id");
    const post = await Post.findById(value);
    if (!post) throw new NotFoundError(`No post with id ${value}`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === post.createdBy.toString();
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("You are not authorized to perform this action");
    }
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("username").notEmpty().withMessage("Username is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("email").custom(async (email) => {
    const user = await User.findOne({ email });
    if (user) {
      throw new BadRequestError("Email already exists");
    }
  }),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
]);

export const validateLoginInput = withValidationErrors([
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("username").notEmpty().withMessage("Username is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("email").custom(async (email) => {
    const user = await User.findOne({ email });
    //Check if the email exists and if it belongs to the current user
    if (user && user._id.toString() !== req.user.userId) {
      throw new BadRequestError("Email already exists");
    }
  }),
  body("email").isEmail().withMessage("Invalid email"),
]);