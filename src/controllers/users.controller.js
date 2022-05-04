import usersService from "../services/users.service.js";

import { logError } from "../utils/logger.js";

export const getUserByEmail = async (req, res) => {
	try {
		const {
			params: { email },
		} = req;
		const user = await usersService.getUserByProperty("email", email);
		res.status(200).send(user);
	} catch (error) {
		logError.error(error.message);
		res.status(404).send({ error: error.message });
	}
};

export const createUser = async (req, res) => {
	try {
		const { body } = req;
		const id = await usersService.createUser(body);

		res.status(200).send(id);
	} catch (error) {
		logError.error(error.message);
		res.status(404).send({ error: error.message });
	}
};

export const updateUserByEmail = async (req, res) => {
	try {
		const {
			body,
			params: { email },
		} = req;
		const user = await usersService.updateUserByProperty(body, "email", email);
		res.status(200).send(user);
	} catch (error) {
		logError.error(error.message);
		res.status(404).send({ error: error.message });
	}
};

export const deleteUserByEmail = async (req, res) => {
	try {
		const {
			params: { email },
		} = req;
		await usersService.deleteUserByProperty("email", email);
		res.status(200).send({ result: "ok" });
	} catch (error) {
		logError.error(error.message);
		res.status(404).send({ error: error.message });
	}
};

export const getUserLogged = async (req, res) => {
	try {
		const { user } = req;
		if (user) {
			res.status(200).send({ user });
		} else {
			throw new Error("There isn't user logged.");
		}
	} catch (error) {
		logError.error(error.message);
		res.status(404).send({ error: error.message });
	}
};