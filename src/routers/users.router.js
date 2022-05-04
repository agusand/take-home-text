import { Router } from "express";
import dotenv from "dotenv";

import {
	getUserByEmail,
	createUser,
	updateUserByEmail,
	deleteUserByEmail,
	getUserLogged,
} from "../controllers/users.controller.js";

import checkAuthentication from "../middlewares/checkAuthentication.js";

const router = Router();
dotenv.config();

router.get("/logged", checkAuthentication, getUserLogged);
router.get("/:email", getUserByEmail);
router.post("/", createUser);
router.put("/:email", updateUserByEmail);
router.delete("/:email", deleteUserByEmail);

export default router;
