"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class LOGGER {
    constructor({ FILE_NAME = "index.log", LOG_MOD = "DEBUG", FILE_PATH = "./logs/", BACKUP_FILE_PATH = "./logs/backup/", TIMEZONE = "UTC", } = {}) {
        this.FILE_NAME = FILE_NAME;
        this.LOG_MOD = LOG_MOD;
        this.FILE_PATH = path_1.default.join(FILE_PATH, FILE_NAME);
        this.BACKUP_FILE_PATH = path_1.default.join(BACKUP_FILE_PATH, FILE_NAME);
        this.TIMEZONE = TIMEZONE;
        this.ensureDirectoryExistence(this.FILE_PATH);
        this.ensureDirectoryExistence(this.BACKUP_FILE_PATH);
        this.OUTPUT = fs_1.default.createWriteStream(this.FILE_PATH, { flags: "a" });
        this.CONSOLER = new console.Console(this.OUTPUT, this.OUTPUT);
    }
    ensureDirectoryExistence(filePath) {
        const dirname = path_1.default.dirname(filePath);
        if (!fs_1.default.existsSync(dirname)) {
            fs_1.default.mkdirSync(dirname, { recursive: true });
        }
    }
    logMessage(level, message) {
        const stack = this.getStackTrace();
        const timestamp = new Date().toLocaleString("en-US", { timeZone: this.TIMEZONE });
        this.CONSOLER.log(`[${timestamp}] - (${stack}) - [${level}] - ${message}`);
    }
    getStackTrace() {
        var _a, _b;
        const err = new Error();
        const stack = ((_a = err.stack) === null || _a === void 0 ? void 0 : _a.split("\n")) || [];
        return ((_b = stack[3]) === null || _b === void 0 ? void 0 : _b.trim().split(" ")[1]) || "unknown";
    }
    info(message) {
        this.logMessage("INFO", message);
    }
    error(message) {
        this.logMessage("ERROR", message);
    }
    warning(message) {
        this.logMessage("WARNING", message);
    }
    debug(message) {
        if (this.LOG_MOD === "DEBUG") {
            this.logMessage("DEBUG", message);
        }
    }
}
LOGGER.LEVEL = {
    INFO: "INFO",
    DEBUG: "DEBUG",
    WARNING: "WARN",
    ERROR: "ERROR",
};
const createLogger = (options) => new LOGGER(options);
exports.createLogger = createLogger;
exports.default = LOGGER;
