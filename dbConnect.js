import mongoose from "mongoose";
import emoji from "node-emoji";

import { logConsole, logError } from "./src/utils/logger.js";

const connectDataBase = async () => {
    try {
        const URL = process.env.MONGO_DB_URL;

        mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        logConsole.info(emoji.get("spiral_note_pad"), " Database connected");
    } catch (error) {
        logError.error(error.message);
    }
};

export default connectDataBase;
