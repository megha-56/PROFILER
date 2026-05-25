//We have made controllers, now makr Routes to reach them

import { Router } from "express"; // step-1: import router
import { editProfile, getUserProfile, loginUser, registerUser } from "../controllers/user.controllers.js"; //step-4:import all controllers
import verifyToken from "../middleware/user.middleware.js";

const router = Router(); // step-2: make router

// step-3: router.request_type("/routes",coontroller_function)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/profile",verifyToken, getUserProfile);
router.post("/edit",verifyToken, editProfile);

export default router; //step-5:export the function

