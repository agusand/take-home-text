import mongoose from "mongoose";

const usersCollection = "users";

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, max: 100, unique: true },
		name: { type: String, required: true, max: 50 },
		image: { type: String, required: true, max: 255 },
		isAdmin: { type: Boolean, required: true, default: false },
		password: { type: String, required: true, max: 50 },
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model(usersCollection, UserSchema);
export default User;
