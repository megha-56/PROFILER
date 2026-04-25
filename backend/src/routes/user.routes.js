import { Router } from "express";
import { getUserProfile, loginUser, registerUser } from "../controllers/user.controllers.js";

const router = Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/profile", getUserProfile);

export default router;