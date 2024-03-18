import { Router } from "express";
const router = Router();

import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import {
  validatePost,
  validatePostId,
} from "../middelware/validationMiddleware.js";

router.route("/").get(getAllPosts).post(validatePost, createPost);
router
  .route("/:id")
  .get(validatePostId, getPost)
  .patch(validatePost, validatePostId, updatePost)
  .delete(validatePostId, deletePost);

// Other router setup ...
export default router;
