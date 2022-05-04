import log4js from "log4js";

log4js.configure({
	appenders: {
		myLoggerConsole: { type: "console" },
		myWarnFile: { type: "file", filename: "warn.log" },
		myErrorFile: { type: "file", filename: "error.log" },
	},
	categories: {
		default: { appenders: ["myLoggerConsole"], level: "info" },
		warns: { appenders: ["myLoggerConsole", "myWarnFile"], level: "warn" },
		errors: { appenders: ["myLoggerConsole", "myErrorFile"], level: "error" },
	},
});

export const logConsole = log4js.getLogger();
export const logWarn = log4js.getLogger("warns");
export const logError = log4js.getLogger("errors");
