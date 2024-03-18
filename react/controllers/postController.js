//this is the controller for the post routes and all CRUD operations

import Post from "../models/postmodels.js";

import { StatusCodes } from "http-status-codes";

export const getAllPosts = async (req, res) => {
  console.log(req.user);
  const posts = await Post.find({createdBy: req.user.userId});
  res.status(StatusCodes.OK).json({ posts });
};
//This is updated to use the Post model mongoose
export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(StatusCodes.OK).json({ post });
};
//This is updated to use the Post model mongoose
export const createPost = async (req, res) => {
  console.log(req.userId);
  req.body.createdBy = req.user.userId;
  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

export const updatePost = async (req, res) => {
  const updatedpost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ updatedpost });
};

export const deletePost = async (req, res) => {
  const removedPost = await Post.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "Post Deleted" });
};
