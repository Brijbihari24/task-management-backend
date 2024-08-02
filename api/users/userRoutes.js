import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  registerVendor,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  createUser,
  forgetUser,
  resetUser,
} from "./userController.js";
import { protect, admin } from "../../middleware/authMiddleware.js";

// router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/register").post(registerUser);
router.route("/register-vendor").post(registerVendor);
router.route("/forget-password").post(forgetUser);
router.route("/reset-password").post(resetUser);
router.route("/").get(protect, admin, getUsers);
router.post("/login", authUser);
router.route("/add").post(createUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;