import { logConsole, logError } from "../utils/logger.js";

export const postLogin = async (req, res) => {
	try {
		logConsole.info("Login success");
		res.status(200).send({ loginOk: true });
	} catch (error) {
		logError.error(error.message);
	}
};
export const getFailLogin = async (req, res) => {
	try {
		logConsole.info("Login error");
		res.status(200).send({ loginOk: false });
	} catch (error) {
		logError.error(error.message);
	}
};

export const postSignup = async (req, res) => {
	try {
		logConsole.info("Signup success");
		res.status(200).send({ signupOk: true });
	} catch (error) {
		logError.error(error.message);
	}
};
export const getFailSignup = async (req, res) => {
	try {
		logConsole.info("Signup error");
		res.status(200).send({ signupOk: false });
	} catch (error) {
		logError.error(error.message);
	}
};
export const getLogout = async (req, res) => {
	try {
		req.logout();
		res.status(200).send({ logoutOk: true });
	} catch (error) {
		logError.error(error.message);
		res.status(404).send({ error });
	}
};
