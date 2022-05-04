import { Router } from "express";
import dotenv from "dotenv";

import {
	getUserByEmail,
	createUser,
	updateUserByEmail,
	deleteUserByEmail,
	getUserLogged,
	uploadUserAvatar,
} from "../controllers/users.controller.js";

import localUpload from "../middlewares/localUpload.js";
import saveFilePath from "../middlewares/saveFilePath.js";
import checkAuthentication from "../middlewares/checkAuthentication.js";

const router = Router();
dotenv.config();

router.get("/logged", checkAuthentication, getUserLogged);
router.get("/:email", getUserByEmail);
router.post("/", createUser);
router.put("/:email", updateUserByEmail);
router.delete("/:email", deleteUserByEmail);
router.post(
	"/upload",
	localUpload.single("image"),
	saveFilePath(
		`${process.env.HOST === "http://localhost"
			? `${process.env.HOST}:${process.env.PORT}`
			: process.env.HOST
		}/assets/avatars/${"${email}${ext}"}`
	),
	uploadUserAvatar
);

export default router;
