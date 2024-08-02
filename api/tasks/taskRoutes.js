import express from "express";
const router = express.Router();

import {
  getTasks,
  getTaskById,
  deleteTask,
  createTask,
  updateTask,
  getAllTasks,
  getTaskBySlug,
} from "./taskController.js";
import { protect, admin } from "../../middleware/authMiddleware.js";

router.route("/").get(getTasks).post(protect, createTask);
router.route("/all").get(getAllTasks);
router
  .route("/:id")
  .get(getTaskById)
  .delete(protect, admin, deleteTask)
  .put(protect, updateTask);
router.route('/slug/:slug').get(getTaskBySlug);

export default router;
