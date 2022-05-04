import emoji from "node-emoji";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import passport from "./src/utils/localStrategy.js";
import { logConsole, logError } from "./src/utils/logger.js";
import connect from "./dbConnect.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
dotenv.config();
connect();

// Settings

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || "http://localhost"

// Middlewares
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

//Public
app.use("/*", express.static(resolve(__dirname, "./build")));

const server = app.listen(PORT, () =>
    logConsole.info(emoji.get("fire"), `Serve on ${HOST}:${PORT}`)
);
server.on("error", (error) => logError.error(error));
