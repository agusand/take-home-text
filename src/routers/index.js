import { Router } from "express";

import usersRouter from "./users.router.js";
import authRouter from "./auth.router.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/auth", authRouter);

// Cors
router.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");

	next();
});

export default router;
