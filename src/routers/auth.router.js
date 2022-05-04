import { Router } from "express";
import passport from "passport";

import {
	getLogout,
	postLogin,
	postSignup,
	getFailSignup,
	getFailLogin,
} from "../controllers/auth.controller.js";

import checkAuthentication from "../middlewares/checkAuthentication.js";

const router = Router();

// Login
router.post(
	"/login",
	passport.authenticate("login", { failureRedirect: "/api/auth/loginFailed" }),
	postLogin
);

// Signup
router.post(
	"/signup",
	passport.authenticate("signup", {
		failureRedirect: "/api/auth/signupFailed",
	}),
	postSignup
);

// Logout
router.get("/logout", checkAuthentication, getLogout);
router.get("/loginFailed", getFailLogin);
router.get("/signupFailed", getFailSignup);

export default router;
