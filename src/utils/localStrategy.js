import passport from "passport";
import bCrypt from "bcrypt";
import passportLocal from "passport-local";
import emoji from "node-emoji";
import dotenv from "dotenv";

import usersService from "../services/users.service.js";

import { logConsole, logWarn, logError } from "./logger.js";

dotenv.config();
const LocalStrategy = passportLocal.Strategy;

const isValidPassword = (user, password) => {
	return bCrypt.compareSync(password, user.password);
};

const loginStrategy = new LocalStrategy(async (username, password, done) => {
	try {
		const user = await usersService.getUserByProperty(
			"email",
			username.toLowerCase()
		);

		if (!user) {
			logWarn.warn(
				emoji.get("x"),
				`User not found with email ${username.toLowerCase()}`
			);
			return done(null, false);
		}

		if (!isValidPassword(user, password)) {
			logWarn.warn(emoji.get("x"), `Invalid password`);
			return done(null, false);
		}
		return done(null, user);
	} catch (error) {
		logError.error(emoji.get("x"), `There was an error`);
		return done(error);
	}
});

const signUpStrategy = new LocalStrategy(
	{ passReqToCallback: true },
	async (req, username, password, done) => {
		try {
			const {
				body: { name, isAdmin, image: imageURL },
				session: { filePath },
			} = req;
			const user = await usersService.getUserByProperty(
				"email",
				username.toLowerCase()
			);

			if (user) {
				logWarn.warn(emoji.get("x"), "User already exists");
				return done(null, false);
			}

			const newUser = {
				email: username.toLowerCase(),
				password,
				name,
				isAdmin,
				image: filePath || imageURL,
			};

			const id = await usersService.createUser(newUser);

			if (id) {
				logConsole.info(
					emoji.get("heavy_check_mark"),
					`User created with id ${id}`
				);
				return done(null, newUser);
			}

			return done(null, id);
		} catch (error) {
			logError.error(emoji.get("x"), `Error in signup: ${error}`);
			return done(error);
		}
	}
);

passport.use("login", loginStrategy);
passport.use("signup", signUpStrategy);

passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser(async (user, done) => {
	done(null, user);
});

export default passport;
