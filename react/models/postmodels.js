import e from "express";
import mongoose from "mongoose";
import { Item_Types } from "../utils/constants.js";
const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    price: Number,
    item: {
      type: String,
      enum: Object.values(Item_Types),
      default: Item_Types.OTHER,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
  
);

export default mongoose.model("Post", postSchema);
