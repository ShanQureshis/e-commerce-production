import express from "express";
import {
  registerController,
  loginController,
  getUserProfileController,
  logoutController,
  updateProfileController,
  updatePasswordController,
  updateProfilePicController,
  passwordResetController,
} from "../controller/userControler.js";
import { isAuth } from "../data/middleWares.js";
import { singleUpload } from "../data/multer.js";
import rateLimit from "express-rate-limit";

const router = express.Router();


// RATE LIMITER
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

//routes

// register
router.post("/register",limiter, registerController);
// login
router.post("/login",limiter, loginController);
// Get Profile Add middleware
router.get("/getProfile", isAuth, getUserProfileController);
//logout
router.get("/logout", isAuth, logoutController);
// update profile
router.put("/profile-update", isAuth, updateProfileController);
// update password
router.put("/update-password", isAuth, updatePasswordController);
// update profile pic
router.put("/update-picture", isAuth, singleUpload, updateProfilePicController);
//forget password
router.post("/reset-password", passwordResetController);

export default router;
