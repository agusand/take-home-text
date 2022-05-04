import emoji from "node-emoji";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import router from "./src/routers/index.js";
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


// Session
app.use(
    session({
        secret: process.env.SECRET,
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: Number(process.env.EXPIRATION_TIME_SECONDS) * 1000 || 600000,
        },
        rolling: true,
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_DB_URL,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Middlewares
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Router
app.use("/api", router);

//Public
app.use("/", express.static(resolve(__dirname, "./build")));
app.use("/assets", express.static(resolve(__dirname, "./src/data")));
app.use("/*", express.static(resolve(__dirname, "./build")));

const server = app.listen(PORT, () =>
    logConsole.info(emoji.get("fire"), `Serve on ${HOST}:${PORT}`)
);
server.on("error", (error) => logError.error(error));
