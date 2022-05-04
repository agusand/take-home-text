import emoji from "node-emoji";
import bcrypt from "bcrypt";

import UserModel from "../models/userModel.js";

import { logConsole, logWarn } from "../utils/logger.js";

class UsersService {
	constructor(model) {
		this.model = model;
	}

	async getUserByProperty(property, value) {
		if (property === "id") {
			property = "_id";
		}

		const filter = {};
		filter[property] = value;

		const user = await this.model.findOne(filter);

		if (user) {
			logConsole.info(
				emoji.get("heavy_check_mark"),
				` The user with ${property} ${value} was getted with success`
			);
			return user;
		} else {
			logWarn.warn(
				`${emoji.get("x")} The user with ${property} ${value} dosn't exists`
			);
		}
	}

	async createUser(newUser) {
		const regularObjectNewUser = JSON.parse(JSON.stringify(newUser));

		regularObjectNewUser["password"] = bcrypt.hashSync(
			regularObjectNewUser.password,
			bcrypt.genSaltSync(10),
			null
		);

		const userSaveModel = await new this.model(regularObjectNewUser);
		const { _id: id } = await userSaveModel.save();

		if (id) {
			logConsole.info(
				emoji.get("heavy_check_mark"),
				` User created with id ${id}`
			);
			return id;
		} else {
			logWarn.warn(`${emoji.get("x")} The user couldn't be created.`);
		}
	}

	async updateUserByProperty(newUser, property, value) {
		const regularObjectNewUser = JSON.parse(JSON.stringify(newUser));

		if (regularObjectNewUser.password) {
			regularObjectNewUser["password"] = bcrypt.hashSync(
				regularObjectNewUser.password,
				bcrypt.genSaltSync(10),
				null
			);
		}

		if (property === "id") {
			property = "_id";
		}

		const filter = {};
		filter[property] = value;

		const user = await this.model.updateOne(filter, regularObjectNewUser);

		if (user) {
			logConsole.info(
				emoji.get("heavy_check_mark"),
				` The user with ${property} ${value} was updated with success`
			);
			return user;
		} else {
			logWarn.warn(
				`${emoji.get("x")} The user with ${property} ${value} dosn't exists`
			);
		}
	}

	async deleteUserByProperty(property, value) {
		if (property === "id") {
			property = "_id";
		}

		const filter = {};
		filter[property] = value;
		await this.model.deleteOne(filter);

		logConsole.info(
			emoji.get("heavy_check_mark"),
			` The user with ${property} ${value} was deleted with success`
		);
		return false;
	}
}

const usersService = new UsersService(UserModel);
export default usersService;
